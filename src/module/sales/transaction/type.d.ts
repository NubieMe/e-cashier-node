type Products = {
    stock: string | StockModel
    price: number
    qty: number
    discount: {
        percent: boolean
        percentage: number
        amount: number
    }
    net_price: number
    ppn: {
        percentage: number
        amount: number
    }
    subtotal: number
}

type Charges = {
    name: string
    percent: boolean
    percentage: number
    amount: number
}

export type TransactionModel = {
    _id: string
    products: Products[]
    net_price: number
    total_ppn: number
    subtotal: number
    charges: Charges[]
    total: number
    payment_method: "cash" | "qris" | "credit_card" | "debit_card" | "transfer" | "emoney"
    note: string
    created_date: Date
    updated_date?: Date
}

export type TransactionRequest = {
    products: Products[]
    net_price: number
    total_ppn: number
    subtotal: number
    charges: Charges[]
    total: number
    payment_method: "cash" | "qris" | "credit_card" | "debit_card" | "transfer" | "emoney"
    note?: string
}

export type PaymentRequest = {
    _id: string
    amount: number
    date: Date
    payment_method: "cash" | "qris" | "credit_card" | "debit_card" | "transfer" | "emoney"
    ref_code: string
}