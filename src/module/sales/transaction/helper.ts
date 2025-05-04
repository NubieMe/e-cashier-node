import { z, ZodType } from "zod";

export const payment_methods = ["cash", "qris", "credit_card", "debit_card", "transfer", "emoney"] as const;

export const TRANSACTIONCREATE: ZodType = z.object({
    products: z.array(z.object({
        stock: z.string({ required_error: "Stock is required", invalid_type_error: "Stock must be a string" }).min(1, { message: "Stock cannot be empty" }),
        // price: z.number({ required_error: "Price is required", invalid_type_error: "Price must be a number" }),
        qty: z.number({ required_error: "Qty is required", invalid_type_error: "Qty must be a number" }).min(1, { message: "Qty cannot be empty" }),
        discount: z.object({
            percent: z.boolean({ required_error: "Discount percent is required", invalid_type_error: "Discount percent must be a boolean" }),
            percentage: z.number({ required_error: "Discount percentage is required", invalid_type_error: "Discount percentage must be a number" }),
            amount: z.number({ required_error: "Discount amount is required", invalid_type_error: "Discount amount must be a number" }),
        }),
        net_price: z.number({ required_error: "Net price is required", invalid_type_error: "Net price must be a number" }),
        ppn: z.object({
            percentage: z.number({ required_error: "PPN percentage is required", invalid_type_error: "PPN percentage must be a number" }),
            amount: z.number({ required_error: "PPN amount is required", invalid_type_error: "PPN amount must be a number" }),
        }).optional(),
        subtotal: z.number({ required_error: "Subtotal is required", invalid_type_error: "Subtotal must be a number" }),
    })),
    net_price: z.number({ required_error: "Net price is required", invalid_type_error: "Net price must be a number" }),
    total_ppn: z.number({ required_error: "Total PPN is required", invalid_type_error: "Total PPN must be a number" }),
    subtotal: z.number({ required_error: "Subtotal is required", invalid_type_error: "Subtotal must be a number" }),
    charges: z.array(z.object({
        name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }).min(1, { message: "Name cannot be empty" }),
        percent: z.boolean({ required_error: "Percent is required", invalid_type_error: "Percent must be a boolean" }),
        percentage: z.number({ required_error: "Percentage is required", invalid_type_error: "Percentage must be a number" }),
        amount: z.number({ required_error: "Amount is required", invalid_type_error: "Amount must be a number" }),
    })),
    total: z.number({ required_error: "Total is required", invalid_type_error: "Total must be a number" }),
    // payment_method: z.enum(payment_methods),
    note: z.string({ invalid_type_error: "Note must be a string" }).optional(),
});

export const PAYMENT: ZodType = z.object({
    amount: z.number({ required_error: "Amount is required", invalid_type_error: "Amount must be a number" }),
    date: z.date({ required_error: "Date is required", invalid_type_error: "Date must be a date" }),
    payment_method: z.enum(payment_methods),
    ref_code: z.string({ required_error: "Ref code is required", invalid_type_error: "Ref code must be a string" }).min(1, { message: "Ref code cannot be empty" }),
})

export const popTransaction = [
    {
        path: "products.stock",
        select: "-__v",
    },
];