import { ResponseError } from "../../../error/response-error";
import Role from "../role/model";
import User from "./model";
import { AddUserRequest, toUserResponse, UserRequest, ADDUSER, UserResponse, LOGIN, LoginRequest, UserModel, LogoutRequest } from "./type";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { validate } from "../../../utils/validator";
import * as db from "../../../database";
import { isObjectId } from "../helper";
import { RoleModel } from "../role/type";

export default new (class UserService {
    private readonly secret_key: string = process.env.SECRET_KEY;

    async addUser(request: AddUserRequest): Promise<UserResponse> {
        const session = await db.connect().startSession();
        const errors: string[] = [];
        try {
            session.startTransaction();
            
            const body = validate(ADDUSER, request);
            
            const ExistingUsername = await User.countDocuments({ username: body.username }).lean();
            const ExistingRole = await Role.findOne({ _id: body.role }).lean();
            
            if (ExistingUsername > 0) {
                errors.push("Username already exists");
            }
            
            if (!ExistingRole) {
                errors.push("Role not found");
            }
            
            if (errors.length > 0) {
                throw new ResponseError(errors.join(", "), 400);
            }
            
            body.password = await bcrypt.hash(body.password, 10);
            
            const user = await User.create([body], { session });

            if (!user[0]) {
                throw new ResponseError("Failed to create user", 500);
            }
            
            await session.commitTransaction();
            
            return toUserResponse({ ...user[0], role: ExistingRole as unknown as RoleModel });
        } catch (err) {
            await session.abortTransaction();
            throw err
        } finally {
            await session.endSession();
        }
    }

    async login(req: LoginRequest): Promise<{ token: string }> {
        const errors: string[] = [];

        const valid = validate(LOGIN, req);
        const user = await User.findOne({ username: valid.username }).lean();

        if (!user) {
            console.log("masuk if");
            errors.push("Username/Password is incorrect");
        } else {
            const isMatch = await bcrypt.compare(valid.password, user.password);

            if (!isMatch && !errors.length) errors.push("Username/Password is incorrect");
        }

        if (errors.length > 0) {
            throw new ResponseError(errors.join(", "), 401);
        }

        const token = jwt.sign({
            _id: user._id,
            role: user.role
        }, this.secret_key, { expiresIn: "8h" });

        await User.updateOne({ _id: user._id }, { token });

        return { token };
    }

    async logout(_id: string) {
        return await User.updateOne({ _id }, { token: "" }).lean();
    }

    async check(token: string) {
        
    }
})();