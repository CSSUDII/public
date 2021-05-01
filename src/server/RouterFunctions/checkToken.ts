import jwt from "jsonwebtoken";

import config from "../../config/db.config";

const checkToken: any = (req: { header: (arg0: string) => any; user: string | object; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { auth: boolean; error: string; }): void; new(): any; }; }; }, next: () => void) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ auth: false, error: "No token was provided." });

    try {
        const configToken: any = config.token // Hack to allow undefined string
        const verified = jwt.verify(token, configToken);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ auth: false, error: "Failed to authenticate token." });
    }

    next();

};

export default checkToken;