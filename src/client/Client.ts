/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from "inklog.js";
import fs from "fs";

import { server } from "../server/Server";
import prisma from "./DatabaseClient";

import { defaults } from "../defaults";
import { Server } from "http";

import "regenerator-runtime/runtime.js";

export class Client {

    public logger: typeof logger;
    public fs: typeof fs;
    public default: typeof defaults;

    public port: number | undefined;
    public debug: boolean | undefined;

    public server: Server | undefined;

    /**
     * Creates a new Client
     * @constructor
     */
    constructor() {
        this.logger = logger;
        this.fs = fs;
        this.default = defaults;
    }

    private async setupDatabase(): Promise<void> {
        await prisma.$connect().then(() => {
            this.logger.info("[DB] Connected to database");
        })
    }

    private checks(): void {
        try {
            this.port = process.env.PORT as any;
            this.debug = process.env.DEBUG as any;
        } catch (e) {
           this.logger.error(e);
           return;
        }

        if (!this.port) this.port = this.default.port;
        if (!this.debug) this.debug = this.default.debug;

    }

    private listen(): void {
        const port: number = this.port || 8080;
        this.server = server.listen(port, "0.0.0.0", () => // Bind on 0.0.0.0, It allows you to access the API from any IP
            this.logger.info(`API Live on: ${port}`),
        );
    }

    /**
     * Loads the client
     * @returns {void}
     */
    public load(): void {
        this.setupDatabase();
        this.checks();
       return this.listen();
    }
}