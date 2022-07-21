import "reflect-metadata";
import "regenerator-runtime/runtime.js";

import { Client } from "./client/Client";

const client: Client = new Client({ slient: false });
client.initialize();

function exitHandler() {
    client.distroy();
    process.exit();
}

if (process.env["TEST_ENV"] !== "Y") {
    process.stdin.resume();

    process.on("exit", exitHandler.bind(null));
    process.on("SIGINT", exitHandler.bind(null));
    process.on("SIGUSR1", exitHandler.bind(null));
    process.on("SIGUSR2", exitHandler.bind(null));

    process.on("uncaughtException", (error) => {
        client.logger.error(error);
    });

    process.on("unhandledRejection", (reason) => {
        client.logger.error(reason);
    });
}
