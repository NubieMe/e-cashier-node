import { NextFunction, Request, Response } from "express";
import serviceFactory from "../service-factory";
import Profile from "./model";

export default class ProfileController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { total, data } = await serviceFactory.getAll(Profile, req.query);

            res.status(200).json({
                message: "success",
                total,
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await serviceFactory.getOne(Profile, req.params.id);

            res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }
}