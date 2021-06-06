/* eslint-disable @typescript-eslint/no-explicit-any */
import yaml from "js-yaml";
import logger from "inklog.js";
import fs from "fs";
import EventEmitter from "events"

import server from "../server/Server";
import { dbClient } from "./dbClient";

import { defaults } from "../Defaults";

import "regenerator-runtime/runtime.js";


export class Client extends EventEmitter {

    public test: boolean;
    public logger: any;
    public fs: typeof fs;
    public default: typeof defaults;
    public config: any;

    public port: number | undefined;
    public debug: boolean | undefined;

    public server: any

    /**
     * @constructor
     * @param test Runs the Sever in Testing Mode
     */
    constructor(test: boolean) {
        super();

        this.test = test;
        this.logger = logger;
        this.fs = fs;
        this.default = defaults;
    }

   private loadConfig() {
        try {
            this.config = yaml.load(this.fs.readFileSync('./config.yml', 'utf8'));
            this.logger.info('Loaded Config File');
            this.emit('configLoaded');
        } catch (e) {
            this.logger.error('Error loading Config ' + e);
            this.logger.warn('Using Default Settings');
            this.emit('error', e);
        }

    }

   private checks() {
        try {
            // Main Config
            this.port = this.config.port;
            this.debug = this.config.debug;
            // Databace Config
            // Moved to dbClient

            this.emit('runningChecks');
        } catch (e) {
            this.emit('error', e);
        }

        if (!this.port) this.port = this.default.port;
        if (!this.debug) this.debug = this.default.debug;

    }

   private listen() {
        if (this.test) {
            this.server = server.listen(this.port);
        } else {
            if (process.env.PORT) {
                this.server = server.listen(process.env.PORT || this.port || 8080);
            }

            const port: number = this.port || 8080;
            this.server = server.listen(port, "0.0.0.0", () => // Bind on 0.0.0.0, It allows you to access the API from any IP
                this.logger.info(`API Live on: ${port}`) && this.emit('ready'),
            );
        }
    }

   // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
   public load() {
        this.loadConfig();
        this.checks();
        new dbClient();
       return this.listen();
    }

}