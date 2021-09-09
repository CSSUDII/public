import express, { Router } from "express";

import helmet from "helmet";
import hsts from "hsts";
import cors from "cors";

import morgan from "morgan";

import "regenerator-runtime/runtime.js";

import { Request, Response, NextFunction } from "express";
// import { loadRoutes } from "./functions/loadRoutes";

import * as IndexRouter from "./routes/indexRouter";
import * as QRGenRouter from "./routes/QRGenRouter";
import * as UserRouter from "./routes/UserRouter";
import * as ImageRouter from "./routes/ImageRouter"; 

export const server = express();
const routes: Map<string, Router> = new Map();

class Server {
    /**
     * Creates a new server
     * @constructor
     */
    constructor() {
        this.init();
    }

    private async setupRoutes(): Promise<void> {
        server.use(IndexRouter.path, IndexRouter.router);
        server.use(QRGenRouter.path, QRGenRouter.router);
        server.use(UserRouter.path, UserRouter.router);
        server.use(ImageRouter.path, ImageRouter.router);
    }

    private init(): void {
        // Setup Routers
        this.setupRoutes();
        
        // Security Stuff
        server.use(helmet());

        // JSON
        server.use('/', express.json());

        // Cores
        server.use(cors());

        if (process.env.NODE_ENV === 'development') {
            server.use(morgan('dev'));
        }

        const hstsMiddleware = hsts({
            maxAge: 1234000
        });

        server.use((req: Request, res: Response, next: NextFunction) => {
            if (req.secure) {
                hstsMiddleware(req, res, next);
            } else {
                next();
            }
        });
    }
}

export const getRoutesMap= (): Map<string, Router> => {
    return routes;
}

new Server();