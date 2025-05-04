import { validate } from "../../../utils/validator";
import { stock_behav, STOCKIO } from "./helper";
import * as db from "../../../database";
import { ResponseError } from "../../../error/response-error";
import Stock from "../stock/model";
import StockIO from "./model";
import { StockIORequest } from "./type";

export default class StockIOService {
    static async inout(request: StockIORequest) {
        const session = await db.connect().startSession();
        try {
            session.startTransaction();
            
            const body = validate(STOCKIO, request);

            let stock, to, stockBody = {};
            if (stock_behav.dec.includes(body.type)) {
                stockBody = { $inc: { qty: -body.qty } };
            } else if (stock_behav.inc.includes(body.type)) {
                stockBody = { $inc: { qty: body.qty } };
            } else if (stock_behav.replace.includes(body.type)) {
                stockBody = { qty: body.qty };
            }
            
            stock = await Stock.findByIdAndUpdate(body.stock, stockBody, { session, new: true }).lean();
            if (!stock) throw new ResponseError("Stock not found", 404);

            switch (body.type) {
                case "transfer":
                    to = await Stock.findOneAndUpdate(
                        { item: stock.item, branch: body.to }, 
                        { $inc: { qty: body.qty }, vendible: stock.vendible },
                        { session, upsert: true, new: true }).lean();
        
                    if (!to) throw new ResponseError("Transfer failed", 500);
        
                    body.to = String(to._id);
                    break;
                case "purchase":
                    if (!body.price) throw new ResponseError("Price is required", 400);
                    break;
                case "adjustment":
                    if (!body.note) throw new ResponseError("Note is required", 400);
                    break;
            }
            
            const result = await StockIO.create([body], { session });

            await session.commitTransaction();
            
            return result[0];
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            await session.endSession();
        }
    }
}