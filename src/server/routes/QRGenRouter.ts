import { Request, Response } from "express";
import QRCode from "qrcode";
import { Canvas } from "canvas";
import { BaseRouter } from "../../express/BaseRouter";
import { Client } from "../../client/Client";
import ClassRouter from "../../express/ClassRouter";
import { Get } from "../../express/handlers";

@ClassRouter("/v1/qrcode")
export class QRGenRouter extends BaseRouter {
    constructor(client: Client) {
        super(client);
    }

    @Get("/:text")
    public async getText(req: Request, res: Response) {
        const text: string = req.params.text;
        const width: number = parseInt(req.query.width as string) || 20;
        const height: number = parseInt(req.query.height as string) || 20;

        if (!text)
            return res
                .status(500)
                .json({ error: true, message: "No input text" });

        res.setHeader("Content-type", "image/png");

        const qr = await QRCode.toCanvas(
            new Canvas(width, height, "image"),
            text
        );

        qr.pngStream().pipe(res);
    }
}
