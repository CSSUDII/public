import express from "express";

import helmet from "helmet";
import hsts from "hsts";

import indexRouter from "./routes/indexRouter";
import placeholdersRouter from "./routes/placeholdersRouter";
import UsersRouter from "./routes/UserRouter";

const server = express();

class Server {
    constructor() {
        server.use('/', indexRouter);
        server.use('/v1/placeholders', placeholdersRouter);
        server.use('/v1/auth', UsersRouter);

        // Security Stuff
        server.use(helmet());

        const hstsMiddleware = hsts({
            maxAge: 1234000
        });

        server.use((req, res, next) => {
            if (req.secure) {
                hstsMiddleware(req, res, next)
            } else {
                next()
            }
        })

    };
};

new Server();

export default server;