import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

class indexRouter {
    constructor() {
        router.get('/', (req: Request, res: Response) => {
           return res.send('Hello World')
        });
    }
}

new indexRouter();

export default router;