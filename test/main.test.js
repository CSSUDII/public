/* eslint-disable no-undef */
import { expect } from '@jest/globals';
import { server } from "../dist/server/Server";

import request from "supertest";
import { describe } from 'yargs';

describe("[API] Express Server Root", () => {
    test("Status Code should return 200", done => {
        request(server)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

describe("[API] Image Router", () => {
    test("Status Code", done => {
        request(server)
        .get("/v1/image")
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    test("Body", done => {
        request(server)
        .get("/v1/image")
        .then(response => {
            expect(response.body).toBe({ error: null, ping: true, result: null, message: "Image Router, Frontend coming soon!" });
            done();
        });
    });
});