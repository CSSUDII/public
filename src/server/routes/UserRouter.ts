/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router, Response, Request, NextFunction } from "express";
import User from "../../models/Users";

import config from "../../config/db.config";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import bodyParser from "body-parser";

import checkToken from "../RouterFunctions/checkToken";

import rateLimit from "express-rate-limit";

const router = Router();

class UsersRouter {
    constructor() {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, 
            max: 100,
            message: "You are being rate limited!"
        });
        
        router.use(bodyParser.urlencoded({ extended: false }));
        router.use(bodyParser.json());

        router.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
            next();
        });

        router.post('/register', async(req: Request, res: Response) => {

            const hashedPassword = bcrypt.hashSync(req.body.password, 8);

            const doseEmailExist = await User.findOne({ email: req.body.email });

            if (doseEmailExist)
                return res.status(400).json({ error: "Email already exists" });

            User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                },

                function(err, user) {
                    const configToken: any = config.token
                    if (err) return res.status(500).send("There was a problem registering the user.");
                    const token = jwt.sign({ id: user._id }, configToken, {
                        expiresIn: 86400
                    });
                    res.status(200).send({ auth: true, token: token });
                });
        });

        router.get('/me', checkToken, (req: Request, res: Response) => {
            // @ts-ignore
           return User.findById(req.user.id, { password: 0 }, (err, user) => {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user was found.");
               return res.status(200).send(user);
            });

        });

        router.post("/login", async(req: Request, res: Response) => {
            const user = await User.findOne({ email: req.body.email });

            if (!user) return res.status(400).json({ error: "No user was found" });

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) return res.status(400).json({ error: "Password is wrong", auth: false, token: null });


            const configToken: any = config.token;

            const token = jwt.sign({
                    name: user.name,
                    id: user._id,
                },
                configToken
            );

           return res.header("x-access-token", token).json({
                error: null,
                token,
            });
        });

        router.get('/logout', (req, res) => {
           return res.status(200).send({ auth: false, token: null });
        });
    }
}

new UsersRouter;

export default router;