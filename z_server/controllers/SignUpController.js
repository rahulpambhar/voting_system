const jwt = require("jsonwebtoken");
const jwtKey = "jwt"
const userSignUpSchema = require("../model/userSignUpSchema")
var Crypter = require('cryptr')


class SignUpController {

    static signup(req, res) {
        var crypter = new Crypter('rahul')
        const ensp = crypter.encrypt(req.body.password)

        const data = new userSignUpSchema({
            username: req.body.username,
            email: req.body.email,
            role: "user",
            password: ensp,
        })

    

        data.save().then((response) => {

            jwt.sign({ response }, jwtKey, { expiresIn: '7h' }, (err, token) => {
                try {

                    const data = {
                        id: response._id,
                        email: response.email
                    }
                    res.send({ status: 200, token: token, result: data, massage: "signUp success" })

                } catch (error) {

                    res.send({ status: 401, err: err, massage: "signup failed." })
                }

            })
        })
    }

    static async login(req, res) {

        const response = await userSignUpSchema.findOne({ email: req.body.email }).select("-password")
        if (response) {
            jwt.sign({ response }, jwtKey, { expiresIn: '7h' }, (err, token) => {
                console.log( response );

                const data = {
                    id: response._id,
                    email: response.email,
                    role: response.role
                }
                res.send({ status: 200, token: token, result: data })
            })
        } else {
            res.send({ status: 400, massage: "Invalid Data Please try Again" })
        }
    }
}


module.exports = SignUpController;