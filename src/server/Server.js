import express from "express";

import indexRouter from "./routes/indexRouter";

const server = express();

class Server {
    constructor() {
        server.use('/', indexRouter);
    };
};

new Server();

export default server;