const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');

let userEmail = "john" + Math.random() + "@testing.com";
let userPassword = "ABC" + Math.random();

const newUser = {
  email: userEmail,
  password: userPassword,
};

beforeAll(async () => {});

//This is required to close the server connection, Jest will hang without this.
afterAll(async () => {
  await mongoose.disconnect();
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
});

/* << ChatGPT4 assistance */
