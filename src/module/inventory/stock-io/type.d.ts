import { BranchModel } from "../../master/branch/type"
import { StockModel } from "../stock/type"

export type StockIOModel = {
    _id: string;
    type: string;
    stock: string | StockModel;
    qty: number;
    price?: number;
    to?: string | StockModel;
    note?: string;
}

export type StockIORequest = {
    type: string;
    stock: string;
    qty: number;
    price?: number;
    to?: string;
    note?: string;
}