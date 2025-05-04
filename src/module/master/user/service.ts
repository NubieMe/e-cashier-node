import { ResponseError } from "../../../error/response-error";
import Role from "../role/model";
import User from "./model";
import { AddUserRequest, UserResponse, LoginRequest, UserModel } from "./type";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { validate } from "../../../utils/validator";
import * as db from "../../../database";
import { ADDUSER, LOGIN, toUserResponse, UPDATEUSER } from "./helper";
import ServiceFactory from "../service-factory";
import Profile from "../profile/model";
import { StringValue } from "ms";
import { ProfileModel } from "../profile/type";

export default class UserService {
    private static readonly secret_key: string = process.env.SECRET_KEY;
    private static readonly duration: string = process.env.TOKEN_DURATION;

    static async create(request: AddUserRequest): Promise<UserResponse> {
        const session = await db.connect().startSession();
        const errors: string[] = [];
        try {
            session.startTransaction();
            
            const body = validate(ADDUSER, request);
            
            const ExistingUsername = await User.countDocuments({ username: body.username }, { session }).lean();
            const ExistingRole = await Role.findById(body.role, { session }).lean();
            
            if (ExistingUsername > 0) {
                errors.push("Username already exists");
            }
            
            if (!ExistingRole) {
                errors.push("Role not found");
            }
            
            if (errors.length > 0) {
                throw new ResponseError(errors.join(", "), 400);
            }
            
            const profileBody = { ...body.profile as ProfileModel };
            delete body.profile;
            
            const createdProfile = await ServiceFactory.create(Profile, profileBody, undefined, [], session);
            body.profile = createdProfile._id;
            
            body.password = await bcrypt.hash(body.password, 10);
            const created = await User.create([body], { session });
            
            if (!created[0]) {
                throw new ResponseError("Failed to create user", 500);
            }
            
            const user = created[0];
            user.profile = createdProfile;
            user.role = ExistingRole as any;
            
            await session.commitTransaction();
            
            return toUserResponse(user as unknown as UserModel);
        } catch (err) {
            await session.abortTransaction();
            throw err
        } finally {
            await session.endSession();
        }
    }

    static async login(request: LoginRequest): Promise<{ token: string }> {
        const errors: string[] = [];

        const body = validate(LOGIN, request);
        const user = await User.findOne({ username: body.username }).lean();

        if (!user) {
            errors.push("Username/Password is incorrect");
        } else {
            const isMatch = await bcrypt.compare(body.password, user.password);

            if (!isMatch && !errors.length) errors.push("Username/Password is incorrect");
        }

        if (errors.length > 0) {
            throw new ResponseError(errors.join(", "), 401);
        }

        const token = jwt.sign({
            _id: user._id,
            role: user.role,
            profile: user.profile,
        }, this.secret_key, { expiresIn: this.duration as StringValue });

        await User.updateOne({ _id: user._id }, { token });

        return { token };
    }

    static async logout(_id: string) {
        return await User.updateOne({ _id }, { token: "" }).lean();
    }

    static async update(request: AddUserRequest) {
        const session = await db.connect().startSession();
        const errors: string[] = [];
        try {
            session.startTransaction();

            const date = new Date();
            const body = validate(UPDATEUSER, request);

            const ExistingUser = await User.findById(request._id, { session }).populate(["profile"]).lean();
            if (!ExistingUser) throw new ResponseError("Data not found", 404);

            if (body.username) {
                const ExistingUsername = await User.countDocuments({ username: body.username }, { session }).lean();
                if (ExistingUsername > 0) {
                    errors.push("Username already exists");
                }
            }

            if (body.password) body.password = await bcrypt.hash(body.password, 10);

            let newRole = await Role.findById(body.role, { session }).lean();
            if (body.role !== String(ExistingUser.role) && !newRole) errors.push("Role not found");

            const profileBody = { ...body.profile as ProfileModel, updated_date: date };
            body.profile = profileBody._id;
            body.updated_date = date;
            
            if (body.profile) await Profile.updateOne({ _id: body.profile }, profileBody, { session }).lean();

            if (errors.length > 0) throw new ResponseError(errors.join(", "), 400);

            const user = await User.findByIdAndUpdate(request._id, body, { session, new: true }).populate(["role", "profile"]).lean();
            if (!user) throw new ResponseError("Failed to update user", 500);

            await session.commitTransaction();

            return toUserResponse(user as unknown as UserModel);
        } catch (e) {
            await session.abortTransaction();
            throw e
        } finally {
            await session.endSession();
        }
    }
};