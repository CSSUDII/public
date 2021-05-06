/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Router } from "express";
import Placeholder from "../../models/Placeholders";

import User from "../../models/Users";
import checkToken from "../RouterFunctions/checkToken";

// Import for Types
import { Request, Response, NextFunction } from "express";

const router = Router();

class placeholdersRouter {

    public router: Router;

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
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        });

        this.router.get('/:name', (req: Request, res: Response) => {
            // res.json(res.placeholder); // Will Crash App
            // Read: https://mongoosejs.com/docs/queries.html
           return res.json({ message: 'Not Working Yet' });
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.router.get('/id/:id', findPlaceholderbyID, checkToken, (req: Request, res: Response, next: NextFunction) => {
            // @ts-ignore
           return User.findById(req.userId, { password: 0 }, (err, user) => {
                if (err) return res.status(500).send("There was a problem finding the user."); // @ts-ignore
                if (!user) return res.status(404).send("No user was found."); // @ts-ignore
               return res.json(res.placeholderByID); // @ts-ignore
            });
        });
    }
}

// Not Working Right Now
// TODO: Fix
// async function findPlaceholder(req, res, next) {
//    var placeholder;
//
//    try {
//        placeholder = await Placeholder.findOne({ 'name': req.params.name }, (err, output) => {
//            if (err) return res.status(500).json({ message: err.message });
//            console.log(output.name);
//        });
//        if (placeholder == null) {
//            return res.status(404).json({ message: "Placeholder not Found" });
//        };
//   } catch (err) {
//        return res.status(500).json({ message: err.message });
//    };
//
//    res.placeholder = placeholder;
//    next();
// };


async function findPlaceholderbyID(req: Request, res: Response, next: NextFunction) {
    let placeholder;

    try {
        placeholder = await Placeholder.findById(req.params.id);
        if (placeholder == null) {
            return res.status(404).json({ message: "Placeholder not Found" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    // @ts-ignore
    res.placeholderByID = placeholder;
    next();
}


new placeholdersRouter();

export default router;