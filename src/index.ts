import "reflect-metadata";
import "regenerator-runtime/runtime.js";

import { Client } from "./client/Client";

const client: Client = new Client();
client.initialize();

process.on("SIGTERM", async () => {
    client.prisma.$disconnect();
    client.logger.info("[DB] Disconnected from database");
});
