import mongoose from "mongoose";
import { types } from "./helper";

const Schema = mongoose.Schema;


const StockIOSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            enum: {
                values: types,
                message: "{VALUE} is not supported",
            },
        },
        stock: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Stock",
        },
        qty: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: false,
        },
        to: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "Stock",
        },
        note: {
            type: String,
            required: false,
        },
    }
);

const StockIO = mongoose.model("StockIO", StockIOSchema);
export default StockIO;