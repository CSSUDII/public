import yaml from "js-yaml";
import logger from "inklog.js";
import fs from "fs";
import EventEmitter from "events"

import server from "../server/Server";

import { defaults } from "../Defaults";


export class Client extends EventEmitter {
    constructor(test) {
        super();

        this.test = test;
        this.logger = logger;
        this.fs = fs;
        this.default = defaults;
    }

    loadConfig() {
        try {
            this.config = yaml.load(this.fs.readFileSync('./config.yml', 'utf8'));
            this.logger.info('Loaded Config File');
            this.emit('configLoaded');
        } catch (e) {
            this.logger.error('Error loading Config ' + e);
            this.logger.warn('Using Default Settings');
            this.emit('error', e);
        };
    };

    checks() {
        try {
            this.port = this.config.port;
            this.debug = this.config.debug;
            this.emit('runningChecks');
        } catch (e) {
            this.emit('error', e);
        };

        if (!this.port) this.port = this.default.port;
        if (!this.debug) this.debug = this.default.debug;

    };

    listen() {
        if (this.test) {
            this.server = server.listen(this.port);
        } else {
            this.server = server.listen(this.port, () =>
                this.logger.info(`API Live on: ${this.port}`) && this.emit('ready'),
            );
        };
    };

    load() {
        this.loadConfig();
        this.checks();
        this.listen();
        return;
    };

};