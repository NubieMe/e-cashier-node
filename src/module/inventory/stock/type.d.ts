import { BranchModel } from "../../master/branch/type"
import { ItemModel } from "../item/type"

export type StockModel = {
    _id: string
    item: string | ItemModel
    qty: number
    vendible: boolean
    branch: string | BranchModel
    created_date: Date
    updated_date?: Date
}

export type StockRequest = {
    item: string
    qty: number
    vendible: boolean
    branch: string
}