import { config } from "dotenv";

export const loadConfig = (): void => {
    config({
        path: "../.env"
    });
}