export type UomModel = {
    _id: string
    name: string
    created_date: Date
    updated_date?: Date
}

export type UomRequest = {
    name: string
}