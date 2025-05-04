import { NextFunction, Request, Response } from "express";
import CompanyService from "./service";

export default class CompanyController {
    static async upsert(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.file) req.body.logo = req.file.filename;
            const data = await CompanyService.upsert(req.body);
            if (data.updated_date) data.updated_date.setHours(data.updated_date.getHours() + 7);
            if (data.logo) data.logo = `${req.protocol}://${req.get("host")}/uploads/company/${data.logo}`;

            res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await CompanyService.getOne();
            if (data) data.created_date.setHours(data.created_date.getHours() + 7);
            if (data.updated_date) data.updated_date.setHours(data.updated_date.getHours() + 7);
            if (data.logo) data.logo = `${req.protocol}://${req.get("host")}/uploads/company/${data.logo}`;

            res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }
}