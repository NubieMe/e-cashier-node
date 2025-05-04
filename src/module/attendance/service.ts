import { AttendanceRequest } from "./type";
import * as db from "../../database";
import Attendance from "./model";
import { ResponseError } from "../../error/response-error";
import { isObjectId } from "../master/helper";

export default class AttendanceService {
    static async inout(userId: string) {
        const session = await db.connect().startSession();
        try {
            session.startTransaction();

            const now = new Date(), last24hours = new Date();
            last24hours.setDate(last24hours.getDate() - 1);

            let attendance = await Attendance.findOne({ user: userId, in: { $gte: last24hours }, out: null }, { session }).lean();
            if (attendance) {
                await Attendance.updateOne({ _id: attendance._id }, { out: now }, { session });
                attendance.out = now;
            } else {
                const doc = await Attendance.create([{ user: userId, in: now }], { session });
                if (!doc[0]) throw new ResponseError("Failed to create", 500);
                attendance = doc[0];
            }

            await session.commitTransaction();

            return attendance;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            await session.endSession();
        }
    }

}