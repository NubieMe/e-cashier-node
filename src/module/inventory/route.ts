import express from "express";
import StockRoute from "./stock/route";
import ItemRoute from "./item/route";
import UomRoute from "./uom/route";

const router = express.Router();

router.use("/stock", StockRoute);
router.use("/item", ItemRoute);
router.use("/uom", UomRoute);

export default router;