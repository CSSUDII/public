import { Request, Response, NextFunction } from "express";
import { getClient } from "./getClient";

export function throw500(res: Response, msg: string) {
    return res.status(500).json({
        error: true,
        message: msg,
    });
}

export function throw400(res: Response, msg: string) {
    return res.status(400).json({
        error: true,
        message: msg,
    });
}

export async function verifyRegister(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.body["name"])
            return throw400(res, "Name not found in request body.");
        if (!req.body["email"])
            return throw400(res, "Email not found in request body.");
        if (!req.body["password"])
            return throw400(res, "Password not found in request body.");

        const user = await getClient().prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (user) {
            return res.status(400).send({
                message: "Email is already in use.",
            });
        }

        next();
    } catch (error) {
        return throw500(res, "Unable to validate email.");
    }
}
