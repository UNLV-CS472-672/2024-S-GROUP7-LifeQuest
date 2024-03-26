const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./server/models/user')


var express = require(“express”);
var router = express.Router();

router.get(“/”, function(req, res, next) {
    res.send(“API is working properly”);
});

module.exports = router;