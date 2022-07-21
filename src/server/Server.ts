import express, { Application, Router } from "express";

import helmet from "helmet";
import hsts from "hsts";
import cors from "cors";

import morgan from "morgan";

import { Request, Response, NextFunction } from "express";
import session from "express-session";

import { MetadataKeys } from "../express/metadata";
import { IRouter, IUse } from "../express/handlers";
import { Client } from "../client/Client";
import { UserRouter } from "./routes/UserRouter";
import { IndexRouter } from "./routes/IndexRouter";
import path from "path";
import { QRGenRouter } from "./routes/QRGenRouter";
import { ImageRouter } from "./routes/ImageRouter";

export class Server {
    private client: Client;
    public app: Application;

    /**
     * Creates a new server
     * @constructor
     */
    constructor(client: Client) {
        this.app = express();
        this.client = client;
        this.init();
    }

    private async setupRoutes() {
        const routerControllers = [
            UserRouter,
            IndexRouter,
            QRGenRouter,
            ImageRouter,
        ];

        const info: Array<{ api: string; file: string }> = [];

        routerControllers.forEach((baseRouter) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const baseRouterInstance: any = new baseRouter(this.client);

            const basePath: string = Reflect.getMetadata(
                MetadataKeys.BASE_PATH,
                baseRouter
            );
            const routers: IRouter[] = Reflect.getMetadata(
                MetadataKeys.ROUTERS,
                baseRouter
            );

            const uses: IUse[] = Reflect.getMetadata(
                MetadataKeys.SERVER_USE,
                baseRouter
            );

            const expressRouter = Router();

            if (uses) {
                if (uses.length) {
                    for (let i = 0; i < uses.length; i++) {
                        expressRouter.use(uses[i].object);
                    }
                }
            }

            for (const r of routers) {
                if (r.middlewares !== undefined && r.middlewares !== null) {
                    expressRouter[r.method](
                        r.path,
                        r.middlewares,
                        baseRouterInstance[String(r.handlerName)].bind(
                            baseRouterInstance
                        )
                    );
                } else {
                    expressRouter[r.method](
                        r.path,
                        baseRouterInstance[String(r.handlerName)].bind(
                            baseRouterInstance
                        )
                    );
                }

                info.push({
                    api: `${r.method.toLocaleUpperCase()} ${basePath + r.path}`,
                    file: `${baseRouter.name}`,
                });
            }

            this.app.use(basePath, expressRouter);
        });
    }

    private init(): void {
        // Security Stuff
        this.app.use(helmet());

        // Cores
        this.app.use(cors());
        this.app.use(
            session({
                secret: this.client.config.secret,
                resave: true,
                saveUninitialized: true,
            })
        );

        // Setup Routers
        this.setupRoutes();

        this.app.use(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (err, _req: Request, res: Response, _next: NextFunction) => {
                if (process.env.NODE_ENV === "development")
                    this.client.logger.error(err.stack);
                res.status(500).json({
                    message: "Something went wrong!",
                    error:
                        process.env["NODE_ENV"] === "development"
                            ? err.stack
                            : err,
                });
            }
        );

        this.app.set("view engine", "ejs");
        this.app.set("views", path.join(__dirname, "../../assets/html"));

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
