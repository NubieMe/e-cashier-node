import express from "express";
import BranchController from "./controller";
import { auth } from "../../../middleware/auth";

const router = express.Router();

router.get("/", BranchController.getAll);
router.get("/:id", BranchController.getOne);
router.post("/", auth(["admin"]), BranchController.create);
router.patch("/:id", auth(["admin"]), BranchController.update);
router.delete("/:id", auth(["admin"]), BranchController.delete);

export default router;