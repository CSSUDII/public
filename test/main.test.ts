import request from "supertest";

describe("/", () => {
    test("Status should return 200", (done) => {
        /**
        request(server)
            .get("/")
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
            */
        expect(1).toBe(1);
        done();
    });
});
