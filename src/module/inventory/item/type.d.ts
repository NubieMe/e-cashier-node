import { UomModel } from "../uom/type"

export type ItemModel = {
    _id: string
    code?: string
    name: string
    description?: string
    uom: string | UomModel
    created_date: Date
    updated_date?: Date
}

export type ItemRequest = {
    code?: string
    name: string
    description?: string
    uom: string
}