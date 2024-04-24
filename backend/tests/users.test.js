const request = require("supertest");
const sinon = require('sinon');
const middleware = require('../middleware/auth.js');
const User = require('../models/user');
const mongoose = require('mongoose');
var app;

let userEmail = "john" + Math.random() + "@testing.com";
let userPassword = "ABC" + Math.random();

const newUser = {
  email: userEmail,
  password: userPassword,
};

beforeAll(async () => {
  //Replace the middleware function with a fake function that passes the request through.
  sinon.stub(middleware, "userVerification")
  .callsFake(async function userVerification(req, res, next) {
      //provide a test user for API to use
      const user = await User.findOne({ email: "backendtesting3927492130@test.net" });
      req.user = user;
      return next();
  });

  //You need to declare this after the fake function is made
  app = require("../app");
});

afterAll(async () => {
  
  const user = await User.findOne({ email: "backendtesting3927492130@test.net" });
  await user.updateOne({ completedQuiz: false });
  
  //Restore middleware function to the original state
  middleware.userVerification.restore();
  mongoose.disconnect;
});

/* ChatGPT4 assistance >> */

// test user creation
describe("POST /users", () => {
  it("should create a new user", async () => {
    // post request to create a new user
    const response = await request(app).post("/users").send(newUser);
    // check if correct user in reponse
    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe(newUser.email);
  });
});

describe("GET /users/:email", () => {
  it("should retrieve a user by email", async () => {
    const response = await request(app).get(`/users/${userEmail}`);
    // expect 200 response
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(userEmail);
  });

  it("should return 404 for a non-existent user", async () => {
    let nonExistentEmail = "nonexistent" + Math.random() + "@testing.com";
    // get request for a non-existent user
    const response = await request(app).get(`/users/${nonExistentEmail}`);
    // expect 404 response not found
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /users/:email", () => {
  it("should delete a user by id", async () => {
    const response1 = await request(app).delete(`/users/${newUser.email}`);
    // expect 200 response
    expect(response1.statusCode).toBe(200);
    expect(response1.body.message).toBe("User deleted successfully");

    // Verify the user has been deleted from the database
    const response2 = await request(app).get(`/users/${newUser.email}`);
    expect(response2.statusCode).toBe(404);
  });

  it("should return 404 for a non-existent user", async () => {
    const response = await request(app).delete(`/users/${newUser.email}`);
    // expect 404 response not found
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("User not found");
  });
});

/* << ChatGPT4 assistance */

// test user stat change
describe("POST /users/changestats", () => {
  it("it should update a user's stats", async () => {
    // request stat change
    const response = await request(app).post("/users/changestats")
    .send({newMeStat: 100, newLoveStat: 100, newWorkStat: 100});
    // check for success
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Stats Updated');
  });
});

describe("GET /users/me", () => {
  it("it should get a user's stats", async () => {
    // request stats
    const response = await request(app).get("/users/me");
    // check for success
    expect(response.statusCode).toBe(200);
  });
});