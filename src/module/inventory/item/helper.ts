import { z, ZodType } from "zod";

export const ITEMUPSERT: ZodType = z.object({
    name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }).min(1, { message: "Name cannot be empty" }),
    uom: z.string({ required_error: "UOM is required", invalid_type_error: "UOM must be a string" }).min(1, { message: "UOM cannot be empty" }),
    code: z.string({ invalid_type_error: "Code must be a string" }).optional(),
    description: z.string({ invalid_type_error: "Description must be a string" }).optional(),
})

export const popItem = [{ path: "uom", select: "-__v" }];