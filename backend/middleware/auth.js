const User = require("../models/user.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

/*
This is the middleware for our webapp. Every API request must go through this in order
to verify that the user is logged in. Users without a valid token are flagged by 
status 401: Unauthorized. (Exception: The login API request does not go through this 
as that needs to be done first to generate a JWT token.) 
*/

module.exports.userVerification = (req, res, next) => {
    //Get the token that is created on login
    const token = req.cookies.login
    if(!token){
        //No token? Bad. Go back to login.
        return res.status(401).json({ message: 'Not Authorized' }); 
    } 
    else{
        jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
            if(err){
                //Bad token? Bad, go back to login.
                return res.status(401).json({ message: 'Not Authorized' }); 
            }
            else{
                //Okay this is a good token, time to find the user!
                const user = await User.findById(data.id)
                if(user){
                    //You pass! Continue along.
                    next();
                }
                else{
                    //No valid user found? Bad, go back to login.
                    return res.status(401).json({ message: 'Not Authorized' }); 
                }
            }
        })
    }
}