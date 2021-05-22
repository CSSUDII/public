import { Router } from "express";
import { Request, Response } from "express";
import jimp from "jimp";

const router = Router();

class ImageRouter {
    constructor() {
        router.get('/', (req: Request, res: Response) => {
            res.json({ message: 'Hello World' });
        });

        router.get('/invert', async (req: Request, res: Response) => {
            const imageURL = req.query.imgUrl;
            if (!imageURL) return res.json({ error: true, message: 'No Image URL' });

            let img;
            try {
                img = await jimp.read(imageURL as never);
                res.set({ 'Content-Type': 'image/png' });
                img.invert();
                res.status(200).send(await img.getBufferAsync('image/png'));
            } catch {
                res.status(404).json({ error: true, message: 'Error Loading Image' });
            }
        });

        router.get('/blur', async (req: Request, res: Response) => {
            const imageURL = req.query.imgUrl;
            let blurAmount: unknown = req.query.blurAmount;
            if (!blurAmount) blurAmount = 4;
            if (!imageURL) return res.json({ error: true, message: 'No Image URL' });

            let img;
            try {
                img = await jimp.read(imageURL as never);
                res.set({ 'Content-Type': 'image/png' });
                img.blur(blurAmount as never);
                res.status(200).send(await img.getBufferAsync('image/png'));
            } catch {
                res.status(400).json({ error: true, message: 'Error Loading Image' });
            }
        });

        router.get('/grayscale', async (req: Request, res: Response) => {
            const imageURL = req.query.imgUrl;
            if (!imageURL) return res.json({ error: true, message: 'No Image URL' });

            let img;
            try {
                img = await jimp.read(imageURL as never);
                res.set({ 'Content-Type': 'image/png' });
                img.grayscale();
                res.status(200).send(await img.getBufferAsync('image/png'));
            } catch {
                res.status(400).json({ error: true, message: 'Error Loading Image' });
            }
        });

    }
}

new ImageRouter()

export default router;