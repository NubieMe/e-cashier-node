import { NextFunction, Request, Response } from "express";
import TransactionService from "./service";

export default class TransactionController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await TransactionService.create(req.body);
            data.created_date.setHours(data.created_date.getHours() + 7);

            res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    static async payment(req: Request, res: Response, next: NextFunction) {
        try {
            req.body._id = req.params.id;
            const data = await TransactionService.payment(req.body);

            res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }
}