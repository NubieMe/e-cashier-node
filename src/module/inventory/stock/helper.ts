import { z, ZodType } from "zod";

export const STOCKUPSERT: ZodType = z.object({
    item: z.string({ required_error: "Item is required", invalid_type_error: "Item must be a string" }).min(1, { message: "Item cannot be empty" }),
    qty: z.number({ required_error: "Qty is required", invalid_type_error: "Qty must be a number" }).min(1, { message: "Qty cannot be empty" }),
    vendible: z.boolean({ required_error: "Vendible is required", invalid_type_error: "Vendible must be a boolean" }),
    branch: z.string({ required_error: "Branch is required", invalid_type_error: "Branch must be a string" }).min(1, { message: "Branch cannot be empty" }),
})

export const TRANSFERSTOCK: ZodType = z.object({
    _id: z.string({ required_error: "Id is required", invalid_type_error: "Id must be a string" }).min(1, { message: "Id cannot be empty" }),
    qty: z.number({ required_error: "Qty is required", invalid_type_error: "Qty must be a number" }).min(1, { message: "Qty cannot be empty" }),
    to: z.string({ required_error: "To is required", invalid_type_error: "To must be a string" }).min(1, { message: "To cannot be empty" }),
})

export const popStock = [
    {
        path: "item",
        select: "-__v",
    },
    {
        path: "branch",
        select: "-__v",
    },
];