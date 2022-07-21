import { NextFunction, Request, Response } from "express";
import { throw400 } from "./verifyRegister";

export async function verifyMe(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        typeof req.session.user !== "undefined" &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        typeof req.session.user.id !== "undefined"
    ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!req.session.user.id)
            return throw400(res, "You are not logged in.");
    } else {
        return throw400(res, "You are not logged in.");
    }

    next();
}
