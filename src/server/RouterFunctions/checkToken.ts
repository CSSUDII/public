/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

import config from "../../config/db.config";

// eslint-disable-next-line @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function checkToken (req: Request, res: Response, next: NextFunction) {
    const token = req.header("x-access-token");
    if (!token) return res.status(401).json({ auth: false, error: "No token was provided." });

    try {
        const configToken: any = config.token
        const verified = jwt.verify(token, configToken);
        // @ts-ignore
        req.user = verified;
       return next();
    } catch (err) {
       return res.status(400).json({ auth: false, error: "Failed to authenticate token." });
    }
}

export default checkToken;