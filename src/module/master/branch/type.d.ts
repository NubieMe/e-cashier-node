export type BranchRequest = {
    _id?: string;
    name: string;
    address: string;
    phone?: string;
}

export type BranchModel = {
    _id: string;
    name: string;
    address: string;
    phone?: string;
    created_date: Date;
    updated_date?: Date;
}