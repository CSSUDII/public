import yaml from "js-yaml";
import logger from "inklog.js";
import fs from "fs";
import EventEmitter from "events"
import mongoose from "mongoose";

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

        try {
            this.dbConfig = yaml.load(this.fs.readFileSync('./config/db.config.yml', 'utf8'));
        } catch (e) {
            this.emit('error', e);
            throw new Error('Error loading dbConfig' + e);
        }

    };

    checks() {
        try {
            // Main Config
            this.port = this.config.port;
            this.debug = this.config.debug;
            // Databace Config
            this.dbURL = this.dbConfig.url;
            this.emit('runningChecks');
        } catch (e) {
            this.emit('error', e);
        };

        if (!this.port) this.port = this.default.port;
        if (!this.debug) this.debug = this.default.debug;

    };

    connectDB() {
        mongoose.connect(this.dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    };

    dbInit() {
        this.db = mongoose.connection;
        this.db.on('error', (e) => { this.logger.error(e) }) && this.emit('error', `db error: ${e}`);
        this.db.once('open', () => {
            this.logger.info('[DB] Connected to MongoDB');
        });
    };

    dbDataSchema() {
        this.placeHoldersSchema = new mongoose.Schema({
            name: String,
            data: String,
        });
    };

    dbDataModel() {
        this.placeholdersDB = mongoose.model('placeholdersDB', this.placeHoldersSchema);
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
        this.connectDB();
        this.dbInit();
        this.dbDataSchema();
        this.dbDataModel();
        this.listen();
        return;
    };

};