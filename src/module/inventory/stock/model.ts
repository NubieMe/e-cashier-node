import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const stockSchema = new Schema(
    {
        item: {
            type: ObjectId,
            required: true,
            ref: "Item",
        },
        qty: {
            type: Number,
            required: true,
            default: 0,
        },
        vendible: {
            type: Boolean,
            required: true,
        },
        branch: {
            type: ObjectId,
            required: true,
            ref: "Branch",
        },
        price: {
            type: Number,
            required: false,
            default: 0,
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
    { collection: "stocks" }
);

const Stock = mongoose.model("Stock", stockSchema);
export default Stock