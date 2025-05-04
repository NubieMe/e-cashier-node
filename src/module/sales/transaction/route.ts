import express from "express";
import { auth } from "../../../middleware/auth";
import TransactionController from "./controller";

const router = express.Router();

router.post("/", auth(), TransactionController.create);
router.post("/payment/:id", auth(), TransactionController.payment);

export default router;