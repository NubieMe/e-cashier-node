import express from "express";
import RoleController from "./controller";
import { auth } from "../../../middleware/auth";

const router = express.Router();

router.get("/", RoleController.getAll);
router.get("/:id", RoleController.getOne);
router.post("/", auth(["admin"]), RoleController.create);
router.patch("/:id", auth(["admin"]), RoleController.update);
router.delete("/:id", auth(["admin"]), RoleController.delete);

export default router;