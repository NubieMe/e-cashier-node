import express from "express";
import StockController from "./controller";
import { auth } from "../../../middleware/auth";

const router = express.Router();

router.get("/", StockController.getAll);
router.get("/:id", StockController.getOne);
router.post("/", auth(), StockController.create);
router.patch("/:id", auth(), StockController.update);
router.delete("/:id", auth(), StockController.delete);

export default router;