const express = require("express")
const mongoose = require("mongoose")
const UserModel = require('../models/user')

var router = express.Router();

mongoose.connect("mongodb+srv://LifeQuestDev:triangleDev@lifequest.1aoc4no.mongodb.net/?retryWrites=true&w=majority&appName=LifeQuest")

router.get('/', (req, res) => {
    console.log("Hello World")
    res.send('Response')
})

module.exports = router;