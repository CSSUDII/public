import { Router } from "express";
import { dbClient } from "../../client/dbClient";

const router = Router();

class placeholdersRouter extends dbClient {
    constructor() {
        super();

        const db = this.placeholdersDB;

        router.get('/:name', (req, res, next) => {
            const name = req.params.name;
            res.json({ name: name, data: `Example Data for ${name}`, text: 'Not Emplanted' });
        });
    };
};


new placeholdersRouter();

export default router;