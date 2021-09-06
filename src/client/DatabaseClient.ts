import logger from "inklog.js";
import { Prisma, PrismaClient } from "@prisma/client";

export class DatabaseClient {

    public logger: typeof logger;
    public db!: PrismaClient;

    /**
     * Creates a database client
     */
    constructor() {
        this.logger = logger;
        this.setupDatabase();
    }

    private async setupDatabase(): Promise<void> {
        /**
         * Creates the Database Client
         */
        const createClient = async() => {
            this.db = new PrismaClient();
        }

        /**
         * Connects to the Database
         */
        const connect = async() => {
            await this.db.$connect();
        }

        await createClient()
            .then(async() => await connect().then(() => this.logger.info("[DB] Connected to database"))
            .catch((err) => this.logger.error("[DB] Error connecting to database: " + err)))
            .catch((err) => this.logger.error("[DB] Failed to create databse client: " + err));
    }

    /**
     * Gets the database client
     * @returns The databse client
     */
    public getDatabase(): PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined> {
        return this.db;
    }

    /**
     * Disconnects for the database
     */
    public async disconnect(): Promise<void> {
        await this.db.$disconnect();
    }

}