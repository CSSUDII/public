import { Router } from "express";
import { Request, Response } from "express";

export const path = "/";
export const router = Router();

class indexRouter {
    /**
     * @constructor
     */
    constructor() {
        router.get('/', (_req: Request, res: Response) => {
           return res.status(200).send("<h1>CSSUDII Public API</h1>");
        });
    }
}

new indexRouter();