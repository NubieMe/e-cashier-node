import mongoose from "mongoose";

const Schema = mongoose.Schema;

const branchSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: false,
        },
        coordinate: [
            {
                type: String,
                required: false,
            }
        ],
        created_date: {
            type: Date,
            default: Date.now
        },
        updated_date: {
            type: Date,
            required: false,
        },
    },
    { collection: "branches" },
);

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;