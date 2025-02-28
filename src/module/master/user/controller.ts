import { NextFunction, Request, Response } from "express";
import UserService from "./service";
import { UserRequest } from "./type";

export default new (class UserController {
    async addUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            if (req.file) {
                req.body.picture = req.file.filename;
            }
            const data = await UserService.addUser(req.body);

            res.status(201).json({
                message: "success",
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await UserService.login(req.body);

            res.status(200).json({
                message: "success",
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await UserService.logout(req.user._id);

            res.status(200).json({
                message: "success"
            });
        } catch (error) {
            next(error);
        }
    }
})();