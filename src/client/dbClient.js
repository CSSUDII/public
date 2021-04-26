import mongoose from "mongoose";
import logger from "inklog.js";
import EventEmitter from "events";

import config from "../../config/db.config";

export class dbClient extends EventEmitter {
    constructor() {
        super();

        this.logger = logger;

        try {
            this.dbConfig = config;
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