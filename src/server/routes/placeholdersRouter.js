import { Router } from "express";
import Placeholder from "../../models/Placeholders";

const router = Router();

class placeholdersRouter {
    constructor() {

        this.router = router;

        this.router.get('/', async(req, res, next) => {
            try {
                const placeholders = await Placeholder.find();
                res.json(placeholders);
            } catch (err) {
                res.status(500).json({ message: err.message });
            };
        });

        this.router.get('/:name', findPlaceholder, (req, res, next) => {
            res.json(res.placeholder); // Add Data Soon!
        });

        this.router.get('/id/:id', findPlaceholderbyID, (req, res, next) => {
            res.json(res.placeholderByID); // Add Data Soon!
        });

        //   this.router.post('/', (req, res, next) => {
        //     const placeholder = new Placeholder({
        //       name: req.body.name,
        //       data: req.body.data
        //       });
        //
        //          try {
        //            const newPlaceholder = placeholder.save();
        //          res.status(201).json({ newPlaceholder });
        //    } catch {
        //      res.status(400).json({ message: err.message });
        //  };
        // });
    };
};

async function findPlaceholder(req, res, next) {
    var placeholder;

    try {
        placeholder = await Placeholder.find(req.params.name);
        if (placeholder == null) {
            return res.status(404).json({ message: "Placeholder not Found" });
        };
    } catch (err) {
        return res.status(500).json({ message: err.message });
    };

    res.placeholder = placeholder;
    next();
};


async function findPlaceholderbyID(req, res, next) {
    var placeholder;

    try {
        placeholder = await Placeholder.findById(req.params.id);
        if (placeholder == null) {
            return res.status(404).json({ message: "Placeholder not Found" });
        };
    } catch (err) {
        return res.status(500).json({ message: err.message });
    };

    res.placeholderByID = placeholder;
    next();
};


async function checkAuth(req, res, next) {}; // Upcomming Auth...


new placeholdersRouter();

export default router;