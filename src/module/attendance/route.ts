import express from "express";
import AttendanceController from "./controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.post("/", auth(), AttendanceController.inout);
router.get("/", AttendanceController.getAll);

export default router;