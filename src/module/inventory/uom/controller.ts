import { NextFunction, Request, Response } from "express";
import ServiceFactory from "../../master/service-factory";
import Uom from "./model";
import { UOMUPSERT } from "./helper";
import { UomModel } from "./type";

export default class UomController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ServiceFactory.create(Uom, req.body, UOMUPSERT);
            data.created_date.setHours(data.created_date.getHours() + 7);

            res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            req.body._id = req.params.id;
            const data = await ServiceFactory.update(Uom, req.body, UOMUPSERT);
            data.created_date.setHours(data.created_date.getHours() + 7);
            data.updated_date.setHours(data.updated_date.getHours() + 7);

            res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { total, data } = await ServiceFactory.getAll(Uom, req.query, [], ["-__v"]);
            for (const doc of data) {
                doc.created_date.setHours(doc.created_date.getHours() + 7);
                if (doc.updated_date) doc.updated_date.setHours(doc.updated_date.getHours() + 7);
            }

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
            const data = (await ServiceFactory.getOne(Uom, req.params.id, [], ["-__v"])) as unknown as UomModel;
            data.created_date.setHours(data.created_date.getHours() + 7);
            if (data.updated_date) data.updated_date.setHours(data.updated_date.getHours() + 7);

            res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = (await ServiceFactory.delete(Uom, req.params.id)) as unknown as UomModel;
            data.created_date.setHours(data.created_date.getHours() + 7);
            if (data.updated_date) data.updated_date.setHours(data.updated_date.getHours() + 7);

            res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }
}