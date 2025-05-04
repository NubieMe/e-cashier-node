import express from "express";
import ItemController from "./controller";
import { auth } from "../../../middleware/auth";

const router = express.Router();

router.get("/", ItemController.getAll);
router.get("/:id", ItemController.getOne);
router.post("/", auth(), ItemController.create);
router.patch("/:id", auth(), ItemController.update);
router.delete("/:id", auth(), ItemController.delete);

export default router;