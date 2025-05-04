import { z, ZodType } from "zod";
import { UserModel, UserResponse } from "./type";

export const ADDUSER: ZodType = z.object({
    username: z.string({ required_error: "Username is required", invalid_type_error: "Username must be a string", }).min(1, { message: "Username cannot be empty" }),
    password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string", }).min(1, { message: "Password cannot be empty" }),
    role: z.string({ required_error: "Role is required" }),
    profile: z.object({
        code: z.string({ required_error: "Code is required", invalid_type_error: "Code must be a string" }).min(1, { message: "Code cannot be empty" }),
        fullname: z.string({ required_error: "Fullname is required", invalid_type_error: "Fullname must be a string", }).min(1, { message: "Fullname cannot be empty" }),
        picture: z.string({ required_error: "Picture is required", invalid_type_error: "Picture must be a string" }).optional(),
        birthdate: z.string().optional(),
        religion: z.string().optional(),
    }),
});

export const LOGIN: ZodType = z.object({
    username: z.string({ required_error: "Username is required", invalid_type_error: "Username must be a string", }).min(1, { message: "Username cannot be empty" }),
    password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string", }).min(1, { message: "Password cannot be empty" }),
});

export const UPDATEUSER: ZodType = z.object({
    username: z.string({ required_error: "Username is required", invalid_type_error: "Username must be a string", }).min(1, { message: "Username cannot be empty" }).optional(),
    password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string", }).min(1, { message: "Password cannot be empty" }).optional(),
    role: z.string({ required_error: "Role is required" }).min(1, { message: "Role cannot be empty" }).optional(),
    profile: z.object({
        _id: z.string({ required_error: "Profile_id is required" }),
        code: z.string({ required_error: "Code is required", invalid_type_error: "Code must be a string" }).min(1, { message: "Code cannot be empty" }),
        fullname: z.string({ required_error: "Fullname is required", invalid_type_error: "Fullname must be a string", }).min(1, { message: "Fullname cannot be empty" }),
        picture: z.string({ required_error: "Picture is required", invalid_type_error: "Picture must be a string" }).optional(),
        birthdate: z.string().optional(),
        religion: z.string().optional(),
    }),
})

export function toUserResponse({ _id, username, role, profile, created_date }: UserModel): UserResponse {
    return {
        _id,
        username,
        role,
        profile,
        created_date
    };
};

export const popUser = [
    {
        path: "role",
        select: "-__v"
    },
    {
        path: "profile",
        select: "-__v"
    },
]