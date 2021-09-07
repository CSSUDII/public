import { Router } from "express";
import { readdirSync } from "fs";
import { getRoutesMap } from "../Server";

interface CustomRouter {
    path: string;
    router: Router;
}

export const loadRoutes = async(): Promise<void> => {
    const routesFiles = readdirSync(`../routes`);
    for (const file of routesFiles) {
        const route: CustomRouter = import(`../routes/${file}`) as never;
        getRoutesMap().set(route.path, route.router);
    }
}