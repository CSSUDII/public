import express, { Application, Router } from "express";

import helmet from "helmet";
import hsts from "hsts";
import cors from "cors";

import morgan from "morgan";

import { Request, Response, NextFunction } from "express";

import { MetadataKeys } from "../express/metadata";
import { IRouter } from "../express/handlers";
import { Client } from "../client/Client";
import { BaseRouter } from "../express/BaseRouter";
import { UserRouter } from "./routes/UserRouter";
import { IndexRouter } from "./routes/IndexRouter";

export class Server {
    private client: Client;
    public info: Promise<{ api: string; handler: string }[]>;
    public app: Application;
    /**
     * Creates a new server
     * @constructor
     */
    constructor(client: Client) {
        this.client = client;
        this.app = express();
        this.init();
    }

    private async setupRoutes() {
        const routerControllers: BaseRouter[] = [
            new UserRouter(this.client),
            new IndexRouter(this.client),
        ];

        const info: Array<{ api: string; handler: string }> = [];

        routerControllers.forEach((baseRouter) => {
            const basePath: string = Reflect.getMetadata(
                MetadataKeys.BASE_PATH,
                baseRouter
            );
            const routers: IRouter[] = Reflect.getMetadata(
                MetadataKeys.ROUTERS,
                baseRouter
            );

            const uses = Reflect.getMetadata(
                MetadataKeys.SERVER_USE,
                baseRouter
            );

            const expressRouter = Router();

            console.log(routers);
            console.log(basePath);
            console.log(uses);

            for (const r of routers) {
                expressRouter[r.method](
                    r.path,
                    baseRouter[String(r.handlerName)].bind(baseRouter)
                );

                info.push({
                    api: `${r.method.toLocaleUpperCase()} ${basePath + r.path}`,
                    handler: `N/A`,
                });
            }

            uses.forEach((o) => {
                expressRouter.use(o);
            });

            this.app.use(basePath, expressRouter);
            console.table(info);
        });

        return info;
    }

    private init(): void {
        // Setup Routers
        this.info = this.setupRoutes();

        // Security Stuff
        this.app.use(helmet());

        // JSON
        this.app.use("/", express.json());

        // Cores
        this.app.use(cors());

        if (process.env.NODE_ENV === "development") {
            this.app.use(morgan("dev"));
        }

        const hstsMiddleware = hsts({
            maxAge: 1234000,
        });

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            if (req.secure) {
                hstsMiddleware(req, res, next);
            } else {
                next();
            }
        });
    }
}
