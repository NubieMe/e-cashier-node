import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        in: {
            type: Date,
            required: true,
        },
        out: {
            type: Date,
            default: null,
        },
    },
    { collection: "attendances" }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;