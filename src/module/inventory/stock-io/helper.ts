import { z, ZodType } from "zod";

export const types = ["transfer", "consumption", "production", "purchase", "defect", "adjustment", "return"] as const;

export const stock_behav = {
    dec: ["transfer", "consumption", "defect", "return"],
    inc: ["production", "purchase"],
    replace: ["adjustment"],
};

export const STOCKIO: ZodType = z.object({
    type: z.enum(types, { required_error: "Type is required", invalid_type_error: "Type must be a string", description: "value is invalid" }),
    stock: z.string({ required_error: "Stock is required", invalid_type_error: "Stock must be a string" }).min(1, { message: "Stock cannot be empty" }),
    qty: z.number({ required_error: "Qty is required", invalid_type_error: "Qty must be a number" }).min(1, { message: "Qty cannot be empty" }),
    to: z.string({ required_error: "To is required", invalid_type_error: "To must be a string" }).optional(),
    note: z.string({ invalid_type_error: "Note must be a string" }).optional(),
});

export const popStockIO = [
    {
        path: "stock",
        select: "-__v",
    },
    {
        path: "to",
        select: "-__v",
    },
];