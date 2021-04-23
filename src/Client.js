// WE-BT16 API
import express from "express";
import yaml from "js-yaml";
import logger from "inklog.js";
import fs from "fs";
import EventEmitter from "events"

import { defaults } from "./Defaults";

const server = express();


export class Client extends EventEmitter {
    constructor() {
        super();

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

    get() {
        server.get('/', (req, res) => {
            if (this.debug) {
                this.logger.debug('Received a GET HTTP method')
                this.emit('getEvent');
            };
            return res.send('Received a GET HTTP method');
        });
    };

    listen() {
        server.listen(this.port, () =>
            this.logger.info(`API Live on: ${this.port}`) && this.emit('ready'),
        );
    };

    load() {
        this.loadConfig();
        this.checks();
        this.get();
        this.listen();
    };

};