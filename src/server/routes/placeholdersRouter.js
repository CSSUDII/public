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

        this.router.get('/:name', (req, res, next) => {
            // res.json(res.placeholder); // Will Crash App
            // Read: https://mongoosejs.com/docs/queries.html
            res.json({ message: 'Not Working Yet' });
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