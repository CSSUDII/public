import { Router } from "express"

const router = Router();

class indexRouter {
    constructor() {
        router.get('/', (req, res, next) => {
            res.send('Example Router')
        });
    };
};

new indexRouter();

export default router;