const request = require("supertest");
const User = require('../models/user');
const mongoose = require('mongoose');
const app = require("../app.js");
const { createJWT } = require("../util/jwt.js");

var testEmail = "login@testing.com";

beforeAll(async () => {});

afterAll(async () => {
  mongoose.disconnect();
});

// Test no auth  token
describe("auth.userVerification", () => {
  it("it should return no token error", async () => {
    // try to access the users API, you will get rejected by middleware
    const response = await request(app).get(`/users/${testEmail}`);
    // check if middleware replied 401
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Not Authorized (No Token)');
  });

  it("it should return success on valid authorization", async () => {
    // Test a valid token for backendtesting3927492130@test.net
    const token = createJWT("6626ea25e799e8ef28c514c5");
    // Get request to test middleware
    const response = await request(app).get(`/users/${testEmail}`).set('Cookie', [`login=${token}`]);
    // Expect 200 for valid get request
    expect(response.statusCode).toBe(200);
  });

  it("it should return bad token error", async () => {
    // Get request to test middleware with a bad token
    const response = await request(app).get(`/users/${testEmail}`).set('Cookie', [`login=${"hi"}`]);
    // Expect 401 because the token is bad
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Not Authorized (Bad Token)');
  });

  it("it should return success on valid authorization", async () => {
    // Test a valid token that does not exist (this object ID is not in the database)
    const token = createJWT("66246874339c9274c5d28cbf");
    // Get request to test middleware
    const response = await request(app).get(`/users/${testEmail}`).set('Cookie', [`login=${token}`]);
    // Expect 401 because the user can not be found
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Not Authorized (No user found)');
  });
});