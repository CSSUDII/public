import { Router } from "express";
import User from "../../models/Users";

import config from "../../../config/db.config.js";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import bodyParser from "body-parser";

import checkToken from "../RouterFunctions/checkToken";

const router = Router();

class UsersRouter {
    constructor() {

        router.use(bodyParser.urlencoded({ extended: false }));
        router.use(bodyParser.json());

        router.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
            next();
        });

        router.post('/register', async(req, res) => {

            var hashedPassword = bcrypt.hashSync(req.body.password, 8);

            const doseEmailExist = await User.findOne({ email: req.body.email });

            if (doseEmailExist)
                return res.status(400).json({ error: "Email already exists" });

            User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                },

                function(err, user) {
                    if (err) return res.status(500).send("There was a problem registering the user.")
                    var token = jwt.sign({ id: user._id }, config.token, {
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

        router.post("/login", async(req, res) => {
            const user = await User.findOne({ email: req.body.email });

            if (!user) return res.status(400).json({ error: "No user was found" });

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword)
                return res.status(400).json({ error: "Password is wrong", auth: false, token: null });

            const token = jwt.sign({
                    name: user.name,
                    id: user._id,
                },
                config.token
            );

            res.header("auth-token", token).json({
                error: null,
                data: {
                    token,
                },
            });
        });

        router.get('/logout', (req, res) => {
            res.status(200).send({ auth: false, token: null });
        });
    };
};

new UsersRouter;

export default router;