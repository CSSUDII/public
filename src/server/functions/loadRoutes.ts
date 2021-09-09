import { readdirSync } from "fs";
import { getRoutesMap } from "../Server";
import path from "path";

/**
 * Loads all the routes
 * @deprecated dose not work yet
 * @exports loadRoutes
 * @async
 */
export const loadRoutes = async(): Promise<void> => {
    const routesFiles = readdirSync(path.resolve("src/server/routes"));
    for (const file of routesFiles) {
        await import(`../routes/${file}`).then((res) => {
            getRoutesMap().set(res.path, res.router);
        }).catch((error) => {
            // Log Error
        });
    }
}