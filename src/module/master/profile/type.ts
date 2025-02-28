export type ProfileModel = {
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