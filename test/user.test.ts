import supertest from "supertest";
import { app } from "../src/server";

describe("User Route", () => {
    let token = "";

    it("should be reject when request is invalid", async () => {
        const response = await supertest(app).post("/api/user/login")
            .send({
                username: "admin",
                password: "rahasia",
            })

        expect(response.status).toBe(401);
        expect(response.body.message).toBeDefined();
        expect(response.body.data).toBeUndefined();
    })

    it("should be able to login", async () => {
        const response = await supertest(app).post("/api/user/login")
            .send({
                username: "admin",
                password: "M@$t3r#dm!n",
            })

        token = response.body.data.token;
        expect(response.status).toBe(200);
        expect(response.body.data.token).toBeDefined();
    })

    it("should be error because username already exist", async () => {
        const response = await supertest(app).post("/api/user/add")
            .set("Authorization", `Bearer ${token}`)
            .send({
                fullname: "admin",
                username: "admin",
                password: "rahasia",
                role: "67bfeeac2b91553d6260db6a",
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.data).toBeUndefined();
    });

    it("should be able to logout", async () => {
        const response = await supertest(app).delete("/api/user/logout")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBeDefined();
        expect(response.body.data).toBeUndefined();
    });
});