import jwt from "jsonwebtoken";

import config from "../../../config/db.config.js";

const checkToken = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ auth: false, error: "No token was provided." });

    try {
        const verified = jwt.verify(token, config.token);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ auth: false, error: "Failed to authenticate token." });
    }
};

export default checkToken;