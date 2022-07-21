import { Router } from "express";
import { Request, Response } from "express";
import jimp from "jimp";
import rateLimit from "express-rate-limit";
import ClassRouter from "../../express/ClassRouter";
import { BaseRouter } from "../../express/BaseRouter";
import { Client } from "../../client/Client";
import { Get, Use } from "../../express/handlers";

export const router = Router();

@ClassRouter("/v1/image")
@Use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "You are being rate limited!",
    })
)
export class ImageRouter extends BaseRouter {
    constructor(client: Client) {
        super(client);
    }

    @Get("")
    public index(_req: Request, res: Response) {
        res.status(200).send("/v1/image");
    }

    @Get("/invert")
    public async invert(req: Request, res: Response) {
        const imageURL = req.query.url;
        if (!imageURL)
            return res.json({ error: true, message: "No image URL" });

        try {
            const img = await jimp.read(imageURL as never);
            res.set({ "Content-Type": "image/png" });
            img.invert();
            res.status(200).send(await img.getBufferAsync("image/png"));
        } catch {
            res.status(404).json({
                error: true,
                message: "Error loading image.",
            });
        }
    }

    @Get("/blur")
    public async blur(req: Request, res: Response) {
        const imageURL = req.query.url;
        let blurAmount: unknown = req.query.blurAmount;
        if (!blurAmount) blurAmount = 4;
        if (!imageURL)
            return res.json({ error: true, message: "No image URL" });

        try {
            const img = await jimp.read(imageURL as never);
            res.set({ "Content-Type": "image/png" });
            img.blur(blurAmount as never);
            res.status(200).send(await img.getBufferAsync("image/png"));
        } catch {
            res.status(404).json({
                error: true,
                message: "Error loading image.",
            });
        }
    }

    @Get("/grayscale")
    public async grayscale(req: Request, res: Response) {
        const imageURL = req.query.url;

        if (!imageURL)
            return res.json({
                error: true,
                message: "No image URL",
            });

        try {
            const img = await jimp.read(imageURL as string);
            res.set({ "Content-Type": "image/png" });
            img.grayscale();
            res.status(200).send(await img.getBufferAsync("image/png"));
        } catch {
            res.status(404).json({
                error: true,
                message: "Error loading image",
            });
        }
    }
}
