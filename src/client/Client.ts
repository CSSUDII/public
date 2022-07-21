/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "http";
import { createLogger, format, Logger, transports } from "winston";

import { Server } from "../server/Server";
import { PrismaClient } from "@cssudii/prisma";

export class Client {
    public logger: Logger;
    public config = { host: "0.0.0.0", port: 8080, token: "a", secret: "b" };

    public server: Server;
    public prisma: PrismaClient;

    private http: http.Server;
    private static instance: Client;

    /**
     * Creates a new Client
     * @constructor
     */
    constructor({ slient }: { slient?: boolean }) {
        this.logger = createLogger({
            silent: slient,
            level: "info",
            format: format.combine(
                format.timestamp({
                    format: "MM-DD-YYYY HH:mm:ss",
                }),
                format.colorize(),
                format.printf(
                    (info) =>
                        `${info.timestamp} ${info.level}: ${info.message}` +
                        (info.splat !== undefined ? `${info.splat}` : " ")
                )
            ),
            defaultMeta: {
                service: "cssudii-api",
            },
            exitOnError: false,
            transports: [new transports.Console()],
        });

        this.server = new Server(this);
        this.prisma = new PrismaClient();

        Client.instance = this;
    }

    private async initDatabase(): Promise<void> {
        await this.prisma.$connect().then(() => {
            this.logger.info("Connected to database");
        });
    }

    private listen(): void {
        this.http = http
            .createServer(this.server.app)
            .listen(this.config.port, this.config.host, () => {
                this.logger.info(
                    `API running on: ${this.config.host}:${this.config.port}`
                );
            });
    }

    public async initialize(): Promise<Client> {
        await this.initDatabase();
        if (process.env["TEST_ENV"] !== "Y") {
            this.listen();
        }
        return this;
    }

    public async distroy() {
        this.prisma.$disconnect();
        this.http.close();
    }

    public static getInstance() {
        return Client.instance;
    }
}
