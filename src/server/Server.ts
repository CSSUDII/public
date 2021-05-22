import express from "express";

import helmet from "helmet";
import hsts from "hsts";
import cors from "cors";

import morgan from "morgan";

import "regenerator-runtime/runtime.js";

import indexRouter from "./routes/indexRouter";
import placeholdersRouter from "./routes/placeholdersRouter";
import UsersRouter from "./routes/UserRouter";
import ImageRouter from "./routes/ImageRouter";

import { Request, Response, NextFunction } from "express";

const server = express();

class Server {
    /**
     * @constructor
     */
    constructor() {
        /**
         * Index Router
         * @returns Index Router
         */
        server.use('/', indexRouter);
        /**
         * Placeholder Router
         * @returns Placeholder Router
         */
        server.use('/v1/placeholders', placeholdersRouter);
        /**
         * Auth Router
         * @returns Auth Router
         */
        server.use('/v1/auth', UsersRouter);
        /**
         * Image Router
         * @returns Image Router
         */
        server.use('/v1/image', ImageRouter);

        server.use('/', express.json());

        // Security Stuff
        server.use(helmet());

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
                hstsMiddleware(req, res, next)
            } else {
                next()
            }
        })

    }
}

new Server();

export default server;