import express from "express";
import ProfileController from "./controller";

const router = express.Router();

router.get("/", ProfileController.getAll);
router.get("/:id", ProfileController.getOne);

export default router;