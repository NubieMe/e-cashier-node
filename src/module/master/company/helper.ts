import { z, ZodType } from "zod";

export const UPSERTCOMPANY: ZodType = z.object({
    name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }).min(1, { message: "Name cannot be empty" }),
    address: z.string({ required_error: "Address is required", invalid_type_error: "Address must be a string" }).min(1, { message: "Address cannot be empty" }),
    phone: z.string({ invalid_type_error: "Phone must be a string" }).optional(),
    email: z.string({ invalid_type_error: "Email must be a string" }).optional(),
    logo: z.string({ invalid_type_error: "Logo must be a string" }).optional(),
});