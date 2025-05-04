import mongoose from "mongoose";
import { payment_methods } from "./helper";

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
    {
        products: [
            {
                stock: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Stock",
                },
                price: {
                    type: Number,
                    required: true,
                },
                qty: {
                    type: Number,
                    required: true,
                },
                discount: {
                    percent: {
                        type: Boolean,
                        required: false,
                    },
                    percentage: {
                        type: Number,
                        required: false,
                    },
                    amount: {
                        type: Number,
                        required: false,
                    },
                },
                net_price: {
                    type: Number,
                    required: true,
                },
                ppn: {
                    percentage: {
                        type: Number,
                        required: false,
                    },
                    amount: {
                        type: Number,
                        required: false,
                    },
                },
                subtotal: {
                    type: Number,
                    required: true,
                },
            },
        ],
        net_price: {
            type: Number,
            required: true,
        },
        total_ppn: {
            type: Number,
            required: true,
        },
        subtotal: {
            type: Number,
            required: true,
        },
        charges: [
            {
                name: {
                    type: String,
                    required: false,
                },
                percent: {
                    type: Boolean,
                    required: false,
                },
                percentage: {
                    type: Number,
                    required: false,
                },
                amount: {
                    type: Number,
                    required: false,
                },
            },
        ],
        total: {
            type: Number,
            required: true,
        },
        payment_details: {
            paid: {
                type: Boolean,
                default: false,
            },
            amount: {
                type: Number,
                required: false,
            },
            date: {
                type: Date,
                required: false,
            },
            payment_method: {
                type: String,
                required: false,
                enum: {
                    values: payment_methods,
                    message: "{VALUE} is not supported",
                },
            },
            ref_code: {
                type: String,
                required: false,
            },
        },
        note: {
            type: String,
            required: false,
        },
        created_date: {
            type: Date,
            default: Date.now
        },
        updated_date: {
            type: Date,
            required: false,
        },
    },
    { collection: "transactions" }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;