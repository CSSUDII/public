/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Response, Request, NextFunction } from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { BaseRouter } from "../../express/BaseRouter";
import { Client } from "../../client/Client";
import ClassRouter from "../../express/ClassRouter";
import { Use, Get, Post } from "../../express/handlers";
import {
    verifyRegister,
    throw500,
    throw400,
} from "../functions/verifyRegister";
import { verifyMe } from "../functions/verifyMe";
import { verifyLogin } from "../functions/verifyLogin";

@ClassRouter("/auth")
@Use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "You are being rate limited!",
    })
)
@Use(express.urlencoded({ extended: false }))
@Use(express.json())
@Use((_req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
    );
    next();
})
export class UserRouter extends BaseRouter {
    private configToken: string;

    constructor(client: Client) {
        super(client);
        this.configToken = this.client.config.token;
    }

    @Get("")
    public async index(_req: Request, res: Response): Promise<void> {
        res.status(200).send("GET /auth");
    }

    @Post("/register", verifyRegister)
    public async register(req: Request, res: Response, _next: NextFunction) {
        try {
            const user = await this.client.prisma.user.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 8),
                    role: "DEFAULT",
                },
            });

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                this.configToken,
                {
                    expiresIn: 86400,
                }
            );

            return res.status(200).send({ auth: true, token: token });
        } catch (error) {
            return throw500(res, "There was a problem registering the user.");
        }
    }

    @Get("/me", verifyMe)
    public async me(req: Request, res: Response) {
        try {
            const user = await this.client.prisma.user.findUnique({
                where: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore type later
                    id: req.session.user.id,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    password: false,
                    role: true,
                },
            });

            if (!user)
                return res
                    .status(404)
                    .json({ error: true, message: "User not found" });

            return res.status(200).json(user);
        } catch (error) {
            return throw500(res, "There was a problem getting user info.");
        }
    }

    @Post("/login", verifyLogin)
    public async login(req: Request, res: Response, _next: NextFunction) {
        const user = await this.client.prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            res.status(400).json({ error: "User not found." });
            return;
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return throw400(res, "Password was not valid.");
        }

        const token = jwt.sign(
            {
                name: user.name,
                id: user.id,
            },
            this.configToken
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req.session.token = token;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req.session.user = user;
        return res.status(200).json({
            token,
        });
    }

    @Post("/logout")
    public logout(req: Request, res: Response) {
        res.status(200).json({ success: true });

        req.session = null;
        res.destroy();
    }
}
