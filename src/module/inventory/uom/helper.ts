import { z, ZodType } from "zod";

export const UOMUPSERT: ZodType = z.object({
    name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }).min(1, { message: "Name cannot be empty" }),
})