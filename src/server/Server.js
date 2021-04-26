import express from "express";

import indexRouter from "./routes/indexRouter";
import placeholdersRouter from "./routes/placeholdersRouter";
import UsersRouter from "./routes/UserRouter";

const server = express();

class Server {
    constructor() {
        server.use('/', indexRouter);
        server.use('/v1/placeholders', placeholdersRouter);
        server.use('/v1/auth', UsersRouter);
    };
};

new Server();

export default server;