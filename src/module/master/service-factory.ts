import { isObjectId, queryMonth } from "./helper"
import { ResponseError } from "../../error/response-error";
import { Model, PopulateOptions } from "mongoose";
import { validate } from "../../utils/validator";
import { ZodType } from "zod";

export default class ServiceFactory {
    static async create(model: typeof Model, request: any, schema?: ZodType, pop: PopulateOptions[] = [], session = undefined) {
        try {
            let body = request;
            if (schema) body = validate(schema, request);

            let data;
            if (session) {
                data = await model.create([body], { session });
                data = data[0];
            }
            else data = await model.create(body);

            if (!data) throw new ResponseError("Failed to create", 500);
            
            if (pop.length) return await data.populate(pop).lean();
            else return data;
        } catch (error) {
            throw error;
        }
    }
    
    static async update (model: typeof Model, request: any, schema: ZodType, session = undefined) {
        try {
            const date = new Date();
            let body = request;
            
            if (schema) body = validate(schema, request);
            body.updated_date = date;

            let data;
            if (session) data = await model.findByIdAndUpdate(request._id, body, { session, new: true }).lean();
            else data = await model.findByIdAndUpdate(request._id, body, { new: true }).lean();
            if (!data) throw new ResponseError("Data not found", 404);
    
            return data;
        } catch (error) {
            throw error;
        }
    }
    
    static async getAll(model: typeof Model, query: any, pop: PopulateOptions[] = [], select: string[] = []) {
        try {
            let page = parseInt(query.page) || 1, limit = parseInt(query.limit) || 10, sort = query.sort || { created_date: -1 };
            const skip = (page - 1) * limit;
            delete query.page; delete query.limit; delete query.sort;
    
            let q: any = {};
            const search = query;

            if (search) {
                Object.keys(search).forEach(k => {
                    if (Array.isArray(search[k])) {
                        q[k] = { $in: search[k] };
                    } else if (search[k] === "true" || search[k] === "false") {
                        q[k] = search[k] === "true"
                    } else if (isObjectId(search[k])) {
                        q[k] = search[k];
                    } else if (k === "start_date") {
                        q[k] = { $gte: search[k] };
                    } else if (k === "end_date") {
                        q[k] = { $lte: search[k] };
                    } else if (k === "month_date") {
                        q[k] = queryMonth(search[k]);
                    } else {
                        q[k] = { $regex: search[k], $options: "i" };
                    }
                });
            }
    
            const total = await model.countDocuments(q).lean();
            const data = await model.find(q).select(select).sort(sort).skip(skip).limit(limit).populate(pop).lean();
    
            return { total, data };
        } catch (error) {
            throw error;
        }
    }
    
    static async getOne(model: typeof Model, id: string, pop: PopulateOptions[] = [], select: string[] = []) {
        try {
            const data = await model.findById(id).select(select).populate(pop).lean();
            if (!data) throw new ResponseError("Data not found", 404);

            return data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteFlag(model: typeof Model, _id: string) {
        try {
            const data = await model.findOneAndUpdate({ _id }, { is_delete: true, deleted_date: new Date() }).lean();
            if (!data) throw new ResponseError("Data not found", 404);

            return data
        } catch (error) {
            throw error;
        }
    }

    static async delete(model: typeof Model, _id: string) {
        try {
            const data = await model.findOneAndDelete({ _id }).lean();
            if (!data) throw new ResponseError("Data not found", 404);

            return data
        } catch (error) {
            throw error;
        }
    }
}
