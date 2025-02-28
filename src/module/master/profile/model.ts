import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "active",
            enum: {
                values: ["active", "inactive"],
                message: "{VALUE} is not supported"
            }
        },
        fullname: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: false,
        },
        birthdate: {
            type: Date,
            required: false,
        },
        religion: {
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
    { collection: "profiles" }
)

const Profile = mongoose.model("Profile", profileSchema);
export default Profile