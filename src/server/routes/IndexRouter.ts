import { Request, Response } from "express";
import { Client } from "../../client/Client";
import { BaseRouter } from "../../express/BaseRouter";
import ClassRouter from "../../express/ClassRouter";
import { Get } from "../../express/handlers";

@ClassRouter("/")
export class IndexRouter extends BaseRouter {
    constructor(client: Client) {
        super(client);
    }

    @Get("")
    public get(_req: Request, res: Response): void {
        res.send("Hello World");
    }
}
