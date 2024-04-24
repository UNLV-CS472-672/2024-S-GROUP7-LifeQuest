const request = require("supertest");
const sinon = require('sinon');
const middleware = require('../middleware/auth.js');
const user = require('../models/user');
const mongoose = require('mongoose');
var app;

var newUser = {
  email: '',
  password: ''
};

beforeAll(async () => {
  //Replace the middleware function with a fake function that passes the request through.
  sinon.stub(middleware, "userVerification")
  .callsFake(function userVerification(req, res, next) {
      return next();
  });

  //You need to declare this after the fake function is made
  app = require("../app.js");

});

afterAll(async () => {
  //Restore middleware function to the original state
  middleware.userVerification.restore();
  mongoose.disconnect();
});

// test user creation
describe("POST /login/submit", () => {
  it("it should not find a user", async () => {
    // Check a user email that is not in database
    // Do not create a user with this email as that will break this test
    newUser.email = 'expectedfailureforbackendtesting3927492130@test.net';

    // post request to create a new user
    const response = await request(app).post("/login/submit").send(newUser);
    // check if user was not found in response
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it("it should not find a password for user", async () => {
    // Check a user email that is in database
    newUser.email = 'backendtesting3927492130@test.net';

    // post request to create a new user
    const response = await request(app).post("/login/submit").send(newUser);
    // check if correct user in reponse
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Password not found');
  });

  it("it should login a user with unfinished quiz", async () => {
    // Check a user that is in database that has not finished quiz
    newUser.email = 'backendtesting3927492130@test.net';
    newUser.password = 'password';
    // Post request to create a new user
    const response = await request(app).post("/login/submit").send(newUser);
    // check if correct user in reponse
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Signed in successfully');
    // check if the request indicated that the quiz needs to be done
    expect(response.body.doQuiz).toBe(true);
  });

  it("it should login a user with finished quiz", async () => {
    // Check a user that is in database that has finished quiz
    newUser.email = 'login@testing.com';
    newUser.password = 'password';
    // Post request to create a new user
    const response = await request(app).post("/login/submit").send(newUser);
    // check if correct user in reponse
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Signed in successfully');
    // check if the request indicated that the quiz has been done
    expect(response.body.doQuiz).toBe(false);
  });

  it("it should throw an error", async () => {
    // Stub the findOne function to throw an error
    sinon.stub(user , 'findOne')
    .throws(new Error('Test error'));

    const response = await request(app).post("/login/submit").send(null);
    // check if error is caught
    expect(response.statusCode).toBe(500);

    //Restore findOne function
    user.findOne.restore();
  });
});