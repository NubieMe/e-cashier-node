import mongoose from "mongoose"

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

export const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: false,
        },
        role: {
            type: ObjectId,
            required: true,
            ref: "Role",
        },
        profile: {
            type: ObjectId,
            required: false,
            ref: "Profile",
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
    { collection: "users" }
)

const User = mongoose.model("User", userSchema);
export default User