import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../master/user/type";
import AttendanceService from "./service";
import ServiceFactory from "../master/service-factory";
import Attendance from "./model";
import { popAttendance } from "./helper";

export default class AttendanceController {
    static async inout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const data = await AttendanceService.inout(req.user._id);
            data.in.setHours(data.in.getHours() + 7);
            if (data.out) data.out.setHours(data.out.getHours() + 7);
            
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
            req.query.sort = { in: -1 } as any;
            const { total, data } = await ServiceFactory.getAll(Attendance, req.query, popAttendance, ["-__v"]);
            for (const doc of data) {
                doc.in.setHours(doc.in.getHours() + 7);
                if (doc.out) doc.out.setHours(doc.out.getHours() + 7);
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
}