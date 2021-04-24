import { Router } from "express";

const router = Router();

class placeholdersRouter {
    constructor() {
        router.get('/:name', (req, res, next) => {
            const name = req.params.name;
            res.json({ name: name, data: `Example Data for ${name}`, text: 'Not Emplanted' });
        });
    };
};


new placeholdersRouter();

export default router;