import { config } from "dotenv";
import path from "path";
import { Client } from "./client/Client";
import prisma from "./client/DatabaseClient";

config({
    path: path.resolve("@env/.env")
});

const client: Client = new Client();
client.load();

process.on("SIGTERM", async() => {
    prisma.$disconnect();
    client.logger.info("[DB] Disconnected from database");
});