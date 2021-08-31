/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from "inklog.js";
import fs from "fs";
import EventEmitter from "events"

import server from "../server/Server";
import { dbClient } from "./dbClient";

import { defaults } from "../Defaults";
import { Server } from "http";

import "regenerator-runtime/runtime.js";

export class Client extends EventEmitter {

    public test: boolean;
    public logger: typeof logger;
    public fs: typeof fs;
    public default: typeof defaults;

    public port: number | undefined;
    public debug: boolean | undefined;

    public server: Server | undefined;

    /**
     * @constructor
     * @param test Runs the Sever in Testing Mode
     */
    constructor({ test }: { test: boolean }) {
        super();

        this.test = test;
        this.logger = logger;
        this.fs = fs;
        this.default = defaults;
    }

   

   private checks() {
        try {
            // Main Config
            this.port = process.env.PORT as any;
            this.debug = process.env.DEBUG as any;
            /**
             * Database Config
             * Moved to @link dbClient.ts
             */

            this.emit('runningChecks');
        } catch (e) {
            this.emit('error', e);
        }

        if (!this.port) this.port = this.default.port;
        if (!this.debug) this.debug = this.default.debug;

    }

   private listen() {
        const port: number = this.port || 8080;
        this.server = server.listen(port, "0.0.0.0", () => // Bind on 0.0.0.0, It allows you to access the API from any IP
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.logger.info(`API Live on: ${port}`) && this.emit('ready'),
        );
    }

   // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
   public load() {
        this.checks();
        new dbClient();
       return this.listen();
    }

}