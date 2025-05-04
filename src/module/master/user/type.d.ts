import { RoleModel } from "../role/type";
import { Request } from "express";
import { ObjectId } from "mongodb";
import { ProfileModel } from "../profile/type";

export type LoginRequest = {
    username: string
    password: string
};

export type LogoutRequest = {
    _id: string
    token: string
}

export type AddUserRequest = {
    _id?: string
    username: string
    password: string
    role: string | ObjectId
    profile: string | ProfileModel
    updated_date?: Date
};

export type UserModel = {
    _id: string | ObjectId
    username: string
    password: string
    role: string | ObjectId | RoleModel
    profile: string | ObjectId | ProfileModel
    token?: string
    created_date: Date
    updated_date?: Date
}

export interface UserRequest extends Request {
    user: { _id: string, role: string, profile: string }
};

export type UserResponse = {
    _id?: string | ObjectId
    username: string
    role: string | ObjectId | RoleModel
    profile: string | ObjectId | ProfileModel
    token?: string
    created_date: Date
    updated_date?: Date
};