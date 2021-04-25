import mongoose from "mongoose";
import yaml from "js-yaml";
import logger from "inklog.js";
import fs from "fs";
import EventEmitter from "events"

export class dbClient extends EventEmitter {
    constructor() {
        super();

        this.logger = logger;
        this.fs = fs;

        try {
            this.dbConfig = yaml.load(fs.readFileSync('./config/db.config.yml', 'utf8'));
        } catch (e) {
            throw new Error('Error loading dbConfig' + e);
        };

        this.dbURL = this.dbConfig.url;

        try {
            mongoose.connect(this.dbURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } catch (e) {
            this.logger.error('Error Connecting to DB')
        };

        this.db = mongoose.connection;

        this.db.on('error', (e) => {
            this.logger.error(e);
            this.emit('error', `db error: ${e}`);
        });

        this.db.once('open', () => {
            this.logger.info('[DB] Connected to MongoDB');
        });

    };

};