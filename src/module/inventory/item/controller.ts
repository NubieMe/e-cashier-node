import { NextFunction, Request, Response } from "express";
import Item from "./model";
import { ITEMUPSERT, popItem } from "./helper";
import ServiceFactory from "../../master/service-factory";
import { ItemModel } from "./type";

export default class ItemController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ServiceFactory.create(Item, req.body, ITEMUPSERT);
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
            const data = await ServiceFactory.update(Item, req.body, ITEMUPSERT);
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
            const { total, data } = await ServiceFactory.getAll(Item, req.query, popItem, ["-__v"]);
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
            const data = (await ServiceFactory.getOne(Item, req.params.id, popItem, ["-__v"])) as unknown as ItemModel;
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
            const data = (await ServiceFactory.delete(Item, req.params.id)) as unknown as ItemModel;
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