import express from 'express';
import UserRoute from './module/master/user/route';
import AttendanceRoute from './module/attendance/route';
import MasterRoute from './module/master/route';
import InventoryRoute from './module/inventory/route';

const router = express.Router();

router.use("/user", UserRoute);
router.use("/attendance", AttendanceRoute);
router.use("/master", MasterRoute);
router.use("/inventory", InventoryRoute);

export default router;