import { NextFunction, Request, Response } from "express";
import { throw400 } from "./verifyRegister";

export async function verifyLogin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.body["email"])
        return throw400(res, "Email not found in request body.");
    if (!req.body["password"])
        return throw400(res, "Password not found in request body.");
    next();
}
