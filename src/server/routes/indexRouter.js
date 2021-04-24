import { Router } from "express";

const router = Router();

class indexRouter {
    constructor() {
        router.get('/', (req, res, next) => {
            res.send('Main Site, Coming soon!')
        });
    };
};

new indexRouter();

export default router;