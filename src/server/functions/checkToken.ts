/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

function checkToken(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader)
        return res
            .status(401)
            .json({ auth: false, error: "No token was provided." });

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];

        const configToken: string | undefined = process.env.TOKEN;
        const verified = jwt.verify(bearerToken, configToken as string);
        // @ts-ignore
        req.user = verified;

        next();
    } else {
        return res.status(403).json({
            error: true,
            message: "Request forbidden.",
        });
    }
}

export default checkToken;
