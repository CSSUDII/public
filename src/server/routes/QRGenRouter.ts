import { Router, Request, Response } from "express";
import QR from "qrcode-svg";
import { convert } from "convert-svg-to-png";

const router = Router();

class QRGenRouter {
    constructor() {
        router.get('/:text', async (req: Request, res: Response) => {
            const text: string = req.params.text;

            if (!text) return res.json({ error: true, message: 'No Input Text' });

            const img = new QR({
                content: text
            }).svg();

            const pngInage = convert(img);

            res.setHeader('Content-type', 'image/png');
            res.send(pngInage);
        });
    }
}

new QRGenRouter();

export default router;