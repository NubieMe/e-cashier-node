import { NextFunction, Request, Response } from "express";
import UserService from "./service";
import { UserModel, UserRequest } from "./type";
import ServiceFactory from "../service-factory";
import User from "./model";
import { popUser } from "./helper";

export default class UserController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            if (req.file) {
                req.body.picture = req.file.filename;
            }
            const data = await UserService.create(req.body);
            data.created_date.setHours(data.created_date.getHours() + 7);

            res.status(201).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await UserService.login(req.body);

            res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await UserService.logout(req.user._id);

            res.status(200).json({
                message: "success"
            });
        } catch (error) {
            next(error);
        }
    }

    static async getCurrent(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const data = (await ServiceFactory.getOne(User, req.user._id, popUser, ["-password", "-token", "-__v"])) as unknown as UserModel;
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

    static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const data = (await ServiceFactory.getOne(User, req.params.id, popUser, ["-password", "-token", "-__v"])) as unknown as UserModel;
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

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { total, data } = await ServiceFactory.getAll(User, req.query, popUser, ["-password", "-token", "-__v"]);
            for (const doc of data) {
                doc.created_date.setHours(doc.created_date.getHours() + 7);
                if (doc.updated_date) doc.updated_date.setHours(doc.updated_date.getHours() + 7);
            }

            res.status(200).json({
                message: "success",
                total,
                data,
            })
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await UserService.update(req.body)
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
};