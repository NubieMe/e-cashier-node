import Role from "../src/module/master/role/model";

export class RoleTest {

    static async delete() {
        await Role.deleteOne({ name: "test" });
    }
}