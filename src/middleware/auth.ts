import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import User from "../module/master/user/model";
import { UserRequest } from "../module/master/user/type";
import Role from "../module/master/role/model";
import { ResponseError } from "../error/response-error";

/**
 * Middleware to check if the user is authenticated and has the required role to access the route.
 * @param {string[]} roles - The roles that the user must have to access the route.
 * @returns {NextFunction} A middleware function to check the authentication and role of the user.
 * @throws {ResponseError} - If the user is not authenticated or does not have the required role.
 */
export const auth = (roles?: string[]) => async (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer")) return next(new ResponseError("Unauthorized", 401));

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY) as { _id: string, role: string, profile: string };

        if (roles && roles.length) {
            roles.push("root");
            const role = await Role.find({ name: { $in: roles.map(role => new RegExp(role, "i")) } }, { _id: 1 }).lean();
            const user = await User.countDocuments({ _id: payload._id, token }).lean();
    
            if (!user) next(new ResponseError("Token is not valid", 401));
            if (!role.some(doc => doc._id.equals(payload.role))) return next(new ResponseError("You don't have permission", 403));
        }
        req.user = payload;

        next();
    } catch (error) {
        next(new ResponseError("Token is not valid", 401));
    }
}