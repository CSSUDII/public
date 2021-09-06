/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Router } from "express";
import Placeholder from "../../models/Placeholders";

// import User from "../../models/Users";
import checkToken from "../RouterFunctions/checkToken";

// Import for Types
import { Request, Response, NextFunction } from "express";

const router = Router();

class placeholdersRouter {

    public router: Router;

    /**
     * @constructor
     */
    constructor() {

        this.router = router;

        this.router.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
            next();
        });

        this.router.get('/', async(req: Request, res: Response) => {
            try {
                const placeholders = await Placeholder.find();
               return res.json(placeholders);
               // @ts-ignore
            } catch (err) {
                // @ts-ignore
                res.status(500).json({ message: err.message });
            }
        });

        this.router.get('/:name', findPlaceholder, checkToken, (req: Request, res: Response) => {
            // @ts-ignore
           return res.json(res.placeholder);
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.router.get('/id/:id', findPlaceholderbyID, checkToken, (req: Request, res: Response, next: NextFunction) => {
            // @ts-ignore
            return res.json(res.placeholderByID);
        });
    }
}

/**
 * Gets a placeholder by its ID
 * @param req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 * @returns Placeholder Data
 */
async function findPlaceholderbyID(req: Request, res: Response, next: NextFunction) {
    let placeholder;

    try {
        placeholder = await Placeholder.findById(req.params.id);
        if (placeholder == null) {
            return res.status(404).json({ message: "Placeholder not Found" });
        }
        // @ts-ignore
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    // @ts-ignore
    res.placeholderByID = placeholder;
    next();
}
/**
 * Gets a Placeholder by its name
 * @param req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 * @returns Placeholder Data
 */
async function findPlaceholder(req: Request, res: Response, next: NextFunction) {
    let placeholder;

    try {
        placeholder = await Placeholder.findOne({ name: req.params.name });
        if (placeholder == null) {
            return res.status(404).json({ message: "Placeholder not Found" });
        }
        // @ts-ignore
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    // @ts-ignore
    res.placeholder = placeholder;
    next();
}


new placeholdersRouter();

export default router;