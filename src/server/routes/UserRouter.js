import { Router } from "express";
import User from "../../models/Users";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import bodyParser from "body-parser";

import yaml from "js-yaml";
import fs from "fs";

import checkToken from "../RouterFunctions/checkToken";

const router = Router();

class UsersRouter {
    constructor() {

        this.dbConfig = yaml.load(fs.readFileSync('./config/db.config.yml', 'utf8'));

        const dbConfig = yaml.load(fs.readFileSync('./config/db.config.yml', 'utf8'));

        router.use(bodyParser.urlencoded({ extended: false }));
        router.use(bodyParser.json());

        router.post('/register', (req, res) => {

            var hashedPassword = bcrypt.hashSync(req.body.password, 8);

            User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                },

                function(err, user) {
                    if (err) return res.status(500).send("There was a problem registering the user.")
                    var token = jwt.sign({ id: user._id }, dbConfig.token, {
                        expiresIn: 86400
                    });
                    res.status(200).send({ auth: true, token: token });
                });
        });

        router.get('/me', checkToken, (req, res, next) => {

            User.findById(req.userId, { password: 0 }, (err, user) => {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user was found.");
                res.status(200).send(user);
            });

        });

        router.post('/login', (req, res) => {

            User.findOne({ email: req.body.email }, (err, user) => {
                if (err) return res.status(500).send(`Server Error: ${err}`);
                if (!user) return res.status(404).send('No user was found.');

                var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

                var token = jwt.sign({ id: user._id }, dbConfig.token, {
                    expiresIn: 86400
                });

                res.status(200).send({ auth: true, token: token });
            });
        });

        router.get('/logout', (req, res) => {
            res.status(200).send({ auth: false, token: null });
        });
    };
};

new UsersRouter;

export default router;