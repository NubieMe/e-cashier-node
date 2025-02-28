import { ObjectId } from "mongodb";
import { filter, isObjectId } from "./helper"
import { ResponseError } from "../../error/response-error";
import { Model } from "mongoose";
import { validate } from "../../utils/validator";
import { ZodType } from "zod";

export default new class ServiceFactory {
    async create(model: typeof Model, request: any, schema: ZodType) {
        try {
            const body = validate(schema, request);
            const data = model.create(body);
            if (!data) throw new ResponseError("Failed to create", 500);
    
            return data;
        } catch (error) {
            throw error;
        }
    }
    
    async update (model: typeof Model, request: any, schema: ZodType) {
        try {
            const body = validate(schema, request);

            const data = await model.findOneAndUpdate({ _id: request._id }, body);
            if (!data) throw new ResponseError("Data not found", 404);
    
            return { ...data, ...body };
        } catch (error) {
            throw error;
        }
    }
    
    async getAll(model: typeof Model, query: any) {
        try {
            let page = parseInt(query.page) || 1, limit = parseInt(query.limit) || 10, sort = query.sort || { created_date: -1 };
            const skip = (page - 1) * limit;
            delete query.page; delete query.limit; delete query.sort;
    
            let q: any = {};
            const search = query;

            if (search) {
                Object.keys(search).forEach((k) => {
                    if (Array.isArray(search[k])) {
                        const values = search[k].map(v => {
                            const oid = isObjectId(v);
                            if (!oid) return v;
                            return oid;
                        });
                        q[k] = { $in: values };
                    } else if (search[k] === "true" || search[k] === "false") {
                        q[k] = search[k] === "true"
                    } else if (isObjectId(search[k])) {
                        q[k] = search[k];
                    } else {
                        q[k] = { $regex: search[k], $options: "i" };
                    }
                });
            }
    
            const total = await model.countDocuments(q);
            const data = await model.find(q).sort(sort).skip(skip).limit(limit);
    
            return { total, data };
        } catch (error) {
            throw error;
        }
    }
    
    async getOne(model: typeof Model, id: string) {
        try {
            const data = await model.findById(id);
            if (!data) throw new ResponseError("Data not found", 404);

            return data;
        } catch (error) {
            throw error;
        }
    }

    async deleteFlag(model: typeof Model, _id: string) {
        try {
            const data = await model.findOneAndUpdate({ _id }, { is_delete: true, deleted_date: new Date() });
            if (!data) throw new ResponseError("Data not found", 404);

            return data
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(model: typeof Model, _id: string) {
        try {
            const data = await model.findOneAndDelete({ _id });
            if (!data) throw new ResponseError("Data not found", 404);

            return data
        } catch (error) {
            throw error;
        }
    }
}
