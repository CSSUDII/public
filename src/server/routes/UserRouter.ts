/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router, Response, Request, NextFunction } from "express";
import prisma from "../../client/DatabaseClient";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import checkToken from "../functions/checkToken";

import rateLimit from "express-rate-limit";
import { User } from "@prisma/client";

export const path = "/v1/auth";
export const router = Router();

const database = prisma;

class UsersRouter {
    /**
     * @constructor
     */
    constructor() {
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, 
            max: 100,
            message: "You are being rate limited!"
        });
        
        router.use(limiter);
        router.use(express.urlencoded({ extended: false }));
        router.use(express.json());

        router.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
            next();
        });

        router.post('/register', async(req: Request, res: Response) => {

            const hashedPassword = bcrypt.hashSync(req.body.password, 8);

            const doseEmailExist = (database).user.findUnique({
                where: {
                    email: req.body.email
                }
            });

            if (await doseEmailExist) return res.status(400).json({ error: "Email already exists" });
            
            await (database).user.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    admin: false
                }
            }).then((user: User) => {
                const configToken: any = process.env.TOKEN;
                const token = jwt.sign({ id: user.id }, configToken, {
                    expiresIn: 86400
                });
                return res.status(200).send({ auth: true, token: token });
            }).catch((error) => {
                res.status(500).json({ auth: null, error: error, message: "There was a problem registering the user." });
            });
        });

        router.get('/me', checkToken, async(req: Request, res: Response) => {
           await (database).user.findUnique({
               where: {
                   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                   // @ts-ignore type later
                   id: req.user.id
               },
               select: {
                   password: false
               }
           }).then((user) => {
               if (!user) return res.status(404).json({ error: true, message: "User not found" });
               return res.status(200).json({ error: false, user: user });
           }).catch((error) => {
               return res.status(500).json({ error: error, message: "There was a problem getting user info" });
           })
        });

        router.post("/login", async(req: Request, res: Response) => {
            const user = await (database).user.findUnique({
                where: {
                    email: req.body.email
                }
            });

            if (!user) return res.status(400).json({ error: "No user was found" });

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) return res.status(400).json({ error: "Password is wrong", auth: false, token: null });


            const configToken: any = process.env.TOKEN;

            const token = jwt.sign({
                    name: user.name,
                    id: user.id,
                },
                configToken
            );

           return res.header("x-access-token", token).json({
                error: null,
                token,
            });
        });

        router.get('/logout', (req, res) => {
            res.status(200).send({ auth: false, token: null });
            return res.destroy();
        });
    }
}

new UsersRouter;