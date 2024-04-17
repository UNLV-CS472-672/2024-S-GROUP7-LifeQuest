const express = require("express")
const User = require('../models/user');
var router = express.Router();
const bcrypt = require("bcryptjs");
const { createJWT } = require("../util/jwt.js");

//A simple test function, only returns a success message. 
//Meant to be used for testing token authentication
router.post('/test', async (req, res, next) => {
    try {
        res.status(200).json({ message: "Tested successfully"});
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;