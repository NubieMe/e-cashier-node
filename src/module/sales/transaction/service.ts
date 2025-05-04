import { PaymentRequest, TransactionRequest } from "./type";
import * as db from "../../../database";
import { validate } from "../../../utils/validator";
import { PAYMENT, popTransaction, TRANSACTIONCREATE } from "./helper";
import Stock from "../../inventory/stock/model";
import Transaction from "./model";
import { ResponseError } from "../../../error/response-error";

export default class TransactionService {
    static async create(request: TransactionRequest) {
        const session = await db.connect().startSession();
        try {
            session.startTransaction();

            const body = validate(TRANSACTIONCREATE, request);
            const stocksId = body.products.map(v => v.stock);
            
            const stocks = await Stock.find({ _id: { $in: stocksId } }, { price: 1 }, { session }).lean();

            let total_net = 0, total_tax = 0, total_sub = 0;
            for (const product of body.products) {
                const stock = stocks.find(doc => String(doc._id) === product.stock);

                product.price = stock.price;
                const prices = product.price * product.qty;
                if (product.discount.percent) product.discount.amount = prices / 100 * product.discount.percentage;
                else product.discount.percentage = product.discount.amount / prices * 100;
                
                product.net_price = prices - product.discount.amount;
                total_net += product.net_price;

                product.ppn.amount = product.net_price / 100 * product.ppn.percentage;
                total_tax += product.ppn.amount;
                product.subtotal = product.net_price + product.ppn.amount;
                total_sub += product.subtotal;
            }

            body.net_price = total_net;
            body.total_ppn = total_tax;
            body.subtotal = total_sub;
            body.total = total_sub;

            if (body.charges.length) {
                for (const charge of body.charges) {
                    if (charge.percent) charge.amount = total_sub / 100 * charge.percentage;
                    else charge.percentage = charge.amount / total_sub * 100;
                    
                    body.total += charge.amount;
                }
            }

            const transaction = await Transaction.create([body], { session });

            await session.commitTransaction();
        
            return transaction[0];
        } catch (error) {
            await session.abortTransaction();
            throw error;   
        } finally {
            await session.endSession();
        }
    }

    static async payment(request: PaymentRequest) {
        const session = await db.connect().startSession();
        try {
            session.startTransaction();

            const body = validate(PAYMENT, request);
            const transaction = await Transaction.findById(request._id, { session }).populate(popTransaction).lean();

            if (!transaction) throw new ResponseError("Transaction not found", 404);
            if (transaction.payment_details.paid) throw new ResponseError("Transaction already paid", 400);
            if (transaction.total !== body.amount) throw new ResponseError("Amount didn't match", 400);

            let updateStock = [];
            for (const product of transaction.products) {
                updateStock.push({
                    updateOne: {
                        filter: { _id: product.stock._id },
                        update: { $inc: { qty: -product.qty } }
                    }
                })
            }

            await Stock.bulkWrite(updateStock, { session });
            await Transaction.updateOne({ _id: transaction._id }, { payment_details: { ...body, paid: true } }, { session });

            await session.commitTransaction();

            return true;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            await session.endSession();
        }
    }
}