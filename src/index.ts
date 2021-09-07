import { Client } from "./client/Client";
import { config } from "dotenv";
import path from "path";
config({
    path: path.resolve("@env/.env")
});
const client: Client = new Client();
client.load();

client.logger.debug(process.env);