import express from "express";
import RoleRoute from "./role/route";
import CompanyRoute from "./company/route";
import BranchRoute from "./branch/route";

const router = express.Router();

router.use("/role", RoleRoute);
router.use("/company", CompanyRoute);
router.use("/branch", BranchRoute);

export default router;