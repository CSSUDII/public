import express from "express";

import indexRouter from "./routes/indexRouter";
import placeholdersRouter from "./routes/placeholdersRouter";

const server = express();

class Server {
    constructor() {
        server.use('/', indexRouter);
        server.use('/v1/placeholders', placeholdersRouter);
    };
};

new Server();

export default server;