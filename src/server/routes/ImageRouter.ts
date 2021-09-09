import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import jimp from "jimp";
import checkToken from "../functions/checkToken";
import rateLimit from "express-rate-limit";

export const path = "/image";
export const router = Router();

class ImageRouter {
    constructor() {

        // Basic Limiter, Will be updraded soon!
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, 
            max: 200,
            message: "You are being rate limited!"
        });

        router.use(limiter);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        router.get('/invert', checkToken, async (req: Request, res: Response, _next: NextFunction) => {
            const imageURL = req.query.imgUrl;
            if (!imageURL) return res.json({ error: true, message: 'No Image URL' });

            try {
                const img = await jimp.read(imageURL as never);
                res.set({ 'Content-Type': 'image/png' });
                img.invert();
                res.status(200).send(await img.getBufferAsync('image/png'));
            } catch {
                res.status(404).json({ error: true, message: 'Error Loading Image' });
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        router.get('/blur', checkToken, async (req: Request, res: Response, _next: NextFunction) => {
            const imageURL = req.query.imgUrl;
            let blurAmount: unknown = req.query.blurAmount;
            if (!blurAmount) blurAmount = 4;
            if (!imageURL) return res.json({ error: true, message: 'No Image URL' });

            try {
                const img = await jimp.read(imageURL as never);
                res.set({ 'Content-Type': 'image/png' });
                img.blur(blurAmount as never);
                res.status(200).send(await img.getBufferAsync('image/png'));
            } catch {
                res.status(400).json({ error: true, message: 'Error Loading Image' });
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        router.get('/grayscale', checkToken, async (req: Request, res: Response, _next: NextFunction) => {
            const imageURL = req.query.imgUrl;

            if (!imageURL) return res.json({ 
                error: true,
                message: "No Image URL"
            });

            try {
                const img = await jimp.read(imageURL as string);
                res.set({ 'Content-Type': 'image/png' });
                img.grayscale();
                res.status(200)
                    .send(await img.getBufferAsync('image/png'));
            } catch {
                res.status(400)
                    .json({ error: true, message: 'Error Loading Image' });
            }
        });

    }
}

new ImageRouter();