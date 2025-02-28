import express from "express";
import UserController from "./controller";
import { auth } from "../../../middleware/auth";
import upload from "../../../middleware/upload";

const router = express.Router();

router.post("/add", auth(["admin"]), upload({ uploadPath: "src/uploads/profile" }).single("picture"), UserController.addUser);
router.post("/login", UserController.login);
router.delete("/logout", auth(), UserController.logout);

export default router;