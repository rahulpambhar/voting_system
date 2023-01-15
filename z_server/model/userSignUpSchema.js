const mongoose = require("../DBconnection/mongoose");

const userSignUpSchema = mongoose.Schema({

    username: String,   
    email: String,
    role: String,   
    password: String,   

})
module.exports = mongoose.model("userSignup", userSignUpSchema)