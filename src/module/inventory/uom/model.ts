import mongoose from "mongoose";

const Schema = mongoose.Schema;

const uomSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
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
    { collection: "uoms" }
);

const Uom = mongoose.model("Uom", uomSchema);
export default Uom