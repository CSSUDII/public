import jwt from "jsonwebtoken";
import yaml from "js-yaml";
import fs from "fs";

function checkToken(req, res, next) {
    const dbConfig = yaml.load(fs.readFileSync('./config/db.config.yml', 'utf8'));
    var token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token was provided.' });

    jwt.verify(token, dbConfig.token, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.userId = decoded.id;
        next();
    });
};

export default checkToken;