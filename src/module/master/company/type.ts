export type CompanyModel = {
    _id: string;
    name: string;
    address: string;
    phone?: string;
    email?: string;
    logo?: string;
    created_date: Date;
    updated_date?: Date;
}

export type CompanyRequest = {
    name: string;
    address: string;
    email?: string;
    phone?: string;
    logo?: string;
}