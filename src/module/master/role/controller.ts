import { NextFunction, Request, Response } from "express";
import ServiceFactory from "../service-factory";
import Role from "./model";
import { RoleRequestSchema } from "./type";

export default new class RoleController {
    async addRole(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ServiceFactory.create(Role, req.body, RoleRequestSchema);

            res.status(201).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateRole(req: Request, res: Response, next: NextFunction) {
        try {
            req.body._id = req.params.id;
            const data = await ServiceFactory.update(Role, req.body, RoleRequestSchema);

            res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllRole(req: Request, res: Response, next: NextFunction) {
        try {
            const { total, data } = await ServiceFactory.getAll(Role, req.query);

            res.status(200).json({
                message: "success",
                total,
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    async getOneRole(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ServiceFactory.getOne(Role, req.params.id);

            res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteRole(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ServiceFactory.deleteOne(Role, req.params.id);

            res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            next(error);
        }
    }
}