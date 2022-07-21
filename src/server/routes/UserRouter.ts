import express, { Response, Request, NextFunction } from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { BaseRouter } from "../../express/BaseRouter";
import { Client } from "../../client/Client";
import ClassRouter from "../../express/ClassRouter";
import { Use, Get, Post } from "../../express/handlers";
import { User } from "@cssudii/prisma";

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
    public async index(req: Request, res: Response): Promise<void> {
        res.send("test");
    }

    @Post("/register")
    public async register(req: Request, res: Response): Promise<void> {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        const doseEmailExist = this.client.prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (await doseEmailExist) {
            res.status(400).json({ error: "Email already exists" });
            return;
        }

        await this.client.prisma.user
            .create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    role: "DEFAULT",
                },
            })
            .then((user: User) => {
                const token = jwt.sign({ id: user.id }, this.configToken, {
                    expiresIn: 86400,
                });
                return res.status(200).send({ auth: true, token: token });
            })
            .catch((error) => {
                res.status(500).json({
                    auth: null,
                    error: error,
                    message: "There was a problem registering the user.",
                });
            });
    }

    @Get("/me")
    public async me(req: Request, res: Response): Promise<void> {
        await this.client.prisma.user
            .findUnique({
                where: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore type later
                    id: req.user.id,
                },
            })
            .then((user) => {
                if (!user)
                    return res
                        .status(404)
                        .json({ error: true, message: "User not found" });
                return res.status(200).json({ error: false, user: user });
            })
            .catch((error) => {
                return res.status(500).json({
                    error: error,
                    message: "There was a problem getting user info",
                });
            });
    }

    @Post("/login")
    public async login(req: Request, res: Response): Promise<void> {
        const user = await this.client.prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            res.status(400).json({ error: "No user was found" });
            return;
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            res.status(400).json({
                error: "Invalid password",
                auth: false,
                token: null,
            });
            return;
        }

        const token = jwt.sign(
            {
                name: user.name,
                id: user.id,
            },
            this.configToken
        );

        res.header("x-access-token", token).json({
            error: null,
            token,
        });
    }

    @Get("/logout")
    public logout(_req: Request, res: Response): void {
        res.status(200).send({ auth: false, token: null });
        res.destroy();
    }
}
