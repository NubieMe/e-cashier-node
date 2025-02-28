import supertest from "supertest";
import { app } from "../src/server";
import { RoleTest } from "./test.util";

describe("CRUD role", () => {
    
    afterAll(async () => {
        await RoleTest.delete();
    });

    it("should reject new role if request is invalid", async () => {
        const response = await supertest(app).post("/api/role/").send({
            name: "",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
    });

    it("should add new role", async () => {
        const response = await supertest(app).post("/api/role/").send({
            name: "test",
        });

        expect(response.status).toBe(201);
        expect(response.body.data.name).toBe("test");
    });

    it("should get roles in array", async () => {
        const response = await supertest(app).get("/api/role/");

        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });

    it("should get error 500", async () => {
        const response = await supertest(app).get("/api/role/123456789");

        expect(response.status).toBe(500);
        expect(response.body.data).toBeUndefined();
    });

    it("should get error 404 when update", async () => {
        const response = await supertest(app).patch("/api/role/67bfeeac2b91553d6260db6a").send({
            name: "test",
        });

        expect(response.status).toBe(404);
        expect(response.body.data).toBeUndefined();
    })

    it("should get 404 when delete role", async () => {
        const response = await supertest(app).delete("/api/role/67bfeeac2b91553d6260db6a");

        expect(response.status).toBe(404);
        expect(response.body.data).toBeUndefined();
    });
});