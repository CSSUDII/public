/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

/**
 * Check the Auth Token
 * @param req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 * @returns {Boolean} If the input token is valid
 */
// eslint-disable-next-line @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function checkToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header("x-access-token");
    if (!token)
        return res
            .status(401)
            .json({ auth: false, error: "No token was provided." });

    try {
        const configToken: string | undefined = process.env.TOKEN;
        const verified = jwt.verify(token, configToken as string);
        // @ts-ignore
        req.user = verified;
        return next();
    } catch (err) {
        return res
            .status(400)
            .json({
                auth: false,
                error: "Failed to authenticate token.",
                message: err,
            });
    }
}

export default checkToken;
