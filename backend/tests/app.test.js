const request = require("supertest");
const sinon = require('sinon');
var express = require('express');
const middleware = require('../middleware/auth.js');
const mongoose = require('mongoose');
var app;

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
describe("App.js route not found", () => {
  it("it should not find a route", async () => {
    // Request a non-existant API
    const response = await request(app).post("/doesnotexist").send(null);
    // Check for a 404 error
    expect(response.statusCode).toBe(404);
  });
});