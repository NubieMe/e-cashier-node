import { ObjectId } from "mongoose";
import { z, ZodType } from "zod";

export const RoleRequestSchema: ZodType = z.object({
    name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string", }).min(1, { message: "Name cannot be empty" }),
})

export type RoleRequest = z.infer<typeof RoleRequestSchema>;

export type RoleResponse = {
    _id: string
    name: string
    created_date: Date
    updated_date?: Date
}

export type RoleModel = {
    _id: string | ObjectId
    name: string
    created_date: Date
    updated_date?: Date
}