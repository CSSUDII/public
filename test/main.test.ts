import "reflect-metadata";
import "regenerator-runtime/runtime.js";

import request from "supertest";
import { Client } from "../dist/client/Client";

let client: Client;

beforeAll(() => {
    process.env.TEST_ENV = "Y";

    client = new Client({ slient: true });
    client.initialize();
});

describe("GET /", () => {
    test("expect response not to be forbidden", async () => {
        const res = await request(client.server.app).get("/");
        expect(res.forbidden).toBe(false);
    });

    test("should respond with a 200 status code", async () => {
        const res = await request(client.server.app).get("/");
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /auth", () => {
    test("should respond with a 200 status code", async () => {
        const res = await request(client.server.app).get("/auth");
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /v1/qrcode", () => {
    test("should respond with a 200 status code", async () => {
        const res = await request(client.server.app).get("/v1/qrcode/_TEST");
        expect(res.statusCode).toBe(200);
    });

    test("expect content-type header to be image/png", async () => {
        const res = await request(client.server.app).get("/v1/qrcode/_TEST");
        expect(res.header["content-type"]).toBe("image/png");
    });
});

afterAll(() => {
    if (typeof client.prisma !== "undefined") {
        client.prisma.$disconnect();
    }
});
