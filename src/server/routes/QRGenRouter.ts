import { Router, Request, Response } from "express";
import QRCode from "qrcode";
import { Canvas } from "node-canvas";

export const router = Router();
export const path = "/qr";

class QRGenRouter {
    constructor() {
        router.get('/:text', async (req: Request, res: Response) => {
            const text: string = req.params.text;
            const width: number = parseInt(req.query.width as string) || 20;
            const height: number = parseInt(req.query.height as string) || 20;

            if (!text) return res.json({ error: true, message: "No Input Text" });
            res.setHeader('Content-type', 'image/png');

            const qr = await QRCode.toCanvas(new Canvas(width, height, "image"), text);

            qr.pngStream().pipe(res);
        });
    }
}

new QRGenRouter();