import { NextFunction, Request, Response } from "express";
import StockIOService from "./service";

export default class StockIOController {
    static async inout (req: Request, res: Response, next: NextFunction) {
        try {
            const data = await StockIOService.inout(req.body);

            res.status(201).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }
}