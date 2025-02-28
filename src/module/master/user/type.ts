import { z, ZodType } from "zod";
import { RoleModel, RoleResponse } from "../role/type";
import { Request } from "express";
import { ObjectId } from "mongodb";

export const ADDUSER: ZodType = z.object({
    // fullname: z.string({ required_error: "Fullname is required", invalid_type_error: "Fullname must be a string", }).min(1, { message: "Fullname cannot be empty" }),
    username: z.string({ required_error: "Username is required", invalid_type_error: "Username must be a string", }).min(1, { message: "Username cannot be empty" }),
    password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string", }).min(1, { message: "Password cannot be empty" }),
    token: z.string().optional(),
    role: z.string({ required_error: "Role is required" }),
});

export const LOGIN: ZodType = z.object({
    username: z.string({ required_error: "Username is required", invalid_type_error: "Username must be a string", }).min(1, { message: "Username cannot be empty" }),
    password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string", }).min(1, { message: "Password cannot be empty" }),
});

export type LoginRequest = {
    username: string
    password: string
};

export type LogoutRequest = {
    _id: string
    token: string
}

export type AddUserRequest = {
    // fullname: string
    username: string
    password: string
    role: string | ObjectId
};

export type UserModel = {
    _id: string | ObjectId
    // fullname: string
    username: string
    password: string
    role: string | ObjectId | RoleModel
    token?: string
    created_date: Date
    updated_date?: Date
}

export interface UserRequest extends Request {
    user: { _id: string, role: string }
};

export type UserResponse = {
    _id?: string | ObjectId
    // fullname: string
    username: string
    role: string | ObjectId | RoleModel
    token?: string
    created_date: Date
    updated_date?: Date
};

export function toUserResponse({ _id, username, role, created_date }: UserModel): UserResponse {
    return {
        _id,
        // fullname,
        username,
        role,
        created_date
    };
};