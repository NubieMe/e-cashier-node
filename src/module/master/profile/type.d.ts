export type ProfileModel = {
    _id?: string
    code: string
    status: string
    fullname: string
    picture?: string
    birthdate?: Date
    religion: string
    created_date: Date
    updated_date?: Date
}

export type ProfileRequest = {
    code?: string
    status?: string
    fullname?: string
    picture?: string
    birthdate?: Date
    religion?: string
    created_date?: Date
    updated_date?: Date
}

export type ProfileResponse = {
    code: string
    status: string
    fullname: string
    picture?: string
    birthdate?: Date
    religion: string
    created_date: Date
    updated_date?: Date
}