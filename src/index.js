// WE-BT16 API
import express from "express";
import yaml from "js-yaml";
import logger from "inklog.js";
import fs from "fs";

import { defaults } from "./Defaults";
import functions from "./functions";

this.logger = logger;
this.fs = fs;
this.default = defaults;

this.port = null;
this.debug = null;
this.config = null;

// Load Config
functions.loadConfig(yaml, logger);

loadConfig();

this.port = this.config.port;
this.debug = this.config.debug;

async checks() => {
    this.logger.debug('Running Checks');
    if (!this.port) this.port = this.default.port;
    if (!this.debug) this.debug = thos.default.debug;
};

const server = express();

server.get('/', (req, res) => {
    if (this.debug) {
        this.logger.debug('POST Request Received')
    }
    return res.send('Received a GET HTTP method');
});

server.listen(this.port, () => {
    this.logger.info(`API Live on: ${this.port}`),
});
