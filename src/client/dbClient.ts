/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import logger from "inklog.js";
import EventEmitter from "events";

export class dbClient extends EventEmitter {

    public logger: any;
    public dbURL: string;
    public db: mongoose.Connection;

    constructor() {
        super();

        this.logger = logger;

        this.dbURL = process.env.DB_URL as string;

        try {
            mongoose.connect(this.dbURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } catch (e) {
            this.logger.error('Error Connecting to DB')
        }

        this.db = mongoose.connection;

        this.db.on('error', (e) => {
            this.logger.error(e);
            this.emit('error', `db error: ${e}`);
        });

        this.db.once('open', () => {
            this.logger.info('[DB] Connected to MongoDB');
        });
    }
}