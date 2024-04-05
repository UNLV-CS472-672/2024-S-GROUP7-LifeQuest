const express = require("express")
const mongoose = require("mongoose")
var router = express.Router();

router.get('/', (req, res) => {
    console.log("Hello World")
    res.send('Response')
})

module.exports = router;