import { validate } from "../../../utils/validator";
import { UPSERTCOMPANY } from "./helper";
import Company from "./model";
import { CompanyRequest } from "./type";

export default class CompanyService {
    static async upsert(request: CompanyRequest) {
        try {
            const date = new Date();
            const body = validate(UPSERTCOMPANY, request);
            
            let company = await Company.findOne({}).lean();
            if (company) {
                await Company.updateOne({ _id: company._id }, { ...body, updated_date: date });
                company = { ...company, ...body, updated_date: date };
            } else {
                company = await Company.create(body);
            }

            return company;
        } catch (error) {
            throw error;
        }
    }

    static async getOne() {
        try {
            return await Company.findOne({}).lean();
        } catch (error) {
            throw error;
        }
    }
}