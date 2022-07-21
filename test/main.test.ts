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

describe("POST /auth/register", () => {
    test("should repond with a 400 status code (no name)", async () => {
        const res = await request(client.server.app).post("/auth/register");
        expect(res.statusCode).toBe(400);
    });

    test("should repond with a 400 status code (no email)", async () => {
        const res = await request(client.server.app)
            .post("/auth/register")
            .send({
                name: "TestUser",
            });
        expect(res.statusCode).toBe(400);
    });

    test("should repond with a 400 status code (no password)", async () => {
        const res = await request(client.server.app)
            .post("/auth/register")
            .send({
                name: "TestUser",
                email: "testuser@localhost",
            });
        expect(res.statusCode).toBe(400);
    });

    //test("should repond with a 200 status code", async () => {
    //    const res = await request(client.server.app)
    //        .post("/auth/register")
    //        .send({
    //            name: "TestUser",
    //            email: "testuser@localhost",
    //            password: "@asp-testpass",
    //        });
    //    expect(res.statusCode).toBe(200);
    //});
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

describe("GET /v1/image", () => {
    test("should respond with a 200 status code", async () => {
        const res = await request(client.server.app).get("/v1/image");
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /v1/image/invert", () => {
    const testImageUrl =
        "https://raw.githubusercontent.com/CSSUDII/public/next/assets/png/CSSUDII.png";
    test("should respond with a 200 status code", async () => {
        const res = await request(client.server.app)
            .get("/v1/image/invert")
            .query({ url: testImageUrl });
        expect(res.statusCode).toBe(200);
    });

    test("expect content-type header to be image/png", async () => {
        const res = await request(client.server.app)
            .get("/v1/image/invert")
            .query({ url: testImageUrl });
        expect(res.header["content-type"]).toContain("image/png");
    });
});

describe("GET /v1/image/blur", () => {
    const testImageUrl =
        "https://raw.githubusercontent.com/CSSUDII/public/next/assets/png/CSSUDII.png";
    test("should respond with a 200 status code", async () => {
        const res = await request(client.server.app)
            .get("/v1/image/blur")
            .query({ url: testImageUrl });
        expect(res.statusCode).toBe(200);
    });

    test("expect content-type header to be image/png", async () => {
        const res = await request(client.server.app)
            .get("/v1/image/blur")
            .query({ url: testImageUrl });
        expect(res.header["content-type"]).toContain("image/png");
    });
});

describe("GET /v1/image/grayscale", () => {
    const testImageUrl =
        "https://raw.githubusercontent.com/CSSUDII/public/next/assets/png/CSSUDII.png";
    test("should respond with a 200 status code", async () => {
        const res = await request(client.server.app)
            .get("/v1/image/grayscale")
            .query({ url: testImageUrl });
        expect(res.statusCode).toBe(200);
    });

    test("expect content-type header to be image/png", async () => {
        const res = await request(client.server.app)
            .get("/v1/image/grayscale")
            .query({ url: testImageUrl });
        expect(res.header["content-type"]).toContain("image/png");
    });
});

afterAll(() => {
    if (typeof client.prisma !== "undefined") {
        client.prisma.$disconnect();
    }
});
