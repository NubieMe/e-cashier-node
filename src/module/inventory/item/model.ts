import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const itemSchema = new Schema(
    {
        code: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        uom: {
            type: ObjectId,
            required: true,
            ref: "Uom",
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
    { collection: "items" }
);

const Item = mongoose.model("Item", itemSchema);
export default Item