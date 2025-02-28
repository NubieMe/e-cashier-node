import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roleSchema = new Schema(
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
    { collection: "roles" }
);

const Role = mongoose.model("Role", roleSchema);
export default Role