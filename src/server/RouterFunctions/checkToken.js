import jwt from "jsonwebtoken";

import config from "../../../config/db.config.js";

function checkToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token was provided.' });

    jwt.verify(token, config.token, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.userId = decoded.id;
        next();
    });
};

export default checkToken;