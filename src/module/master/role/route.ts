import express from "express";
import RoleController from "./controller";

const router = express.Router();

router.get("/", RoleController.getAllRole);
router.get("/:id", RoleController.getOneRole);
router.post("/", RoleController.addRole);
router.patch("/:id", RoleController.updateRole);
router.delete("/:id", RoleController.deleteRole);

export default router;