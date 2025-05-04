import express from "express";
import UomController from "./controller";
import { auth } from "../../../middleware/auth";

const router = express.Router();

router.get("/", UomController.getAll);
router.get("/:id", UomController.getOne);
router.post("/", auth(), UomController.create);
router.patch("/:id", auth(), UomController.update);
router.delete("/:id", auth(), UomController.delete);

export default router;