require("dotenv").config();
/*
JSON Web Token (JWT): 
"For securely transmitting information between 
parties as a JSON object. This information can be 
verified and trusted because it is digitally signed."
- From jwt.io/introduction 
*/
const jwt = require("jsonwebtoken");

//Generates a new JWT token using a secret TOKEN_KEY. Shhhh.
module.exports.createJWT = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        //Token expires in 1 day
        expiresIn: 60 * 60 * 24
    });
};