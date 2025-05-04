import express from "express";
import CompanyController from "./controller";
import { auth } from "../../../middleware/auth";
import upload from "../../../middleware/upload";

const router = express.Router();

router.post("/", auth(["admin"]), upload({ uploadPath: "src/uploads/company" }).single("logo"), CompanyController.upsert);
router.get("/", CompanyController.getOne);

export default router;