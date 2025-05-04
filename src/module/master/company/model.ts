import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companySchema = new Schema(
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
        email: {
            type: String,
            required: false,
        },
        logo: {
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
    { collection: "companies" }
)

const Company = mongoose.model("Company", companySchema);
export default Company