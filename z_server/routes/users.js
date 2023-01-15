const express = require('express')
const Route = express.Router()


const SignUpController = require('../controllers/SignUpController');

Route.post('/signup', SignUpController.signup);
Route.post('/login', SignUpController.login)

module.exports=Route