const express = require('express')
const { AuthController } = require('../controllers/index.ts')
const { validateRegister, validateLogin } = require('../config/validate.ts')
const userRouter = express.Router()

/**
 * @param {*} app - express app
 */

userRouter.post('/register', validateRegister, AuthController.register)
userRouter.post('/login', validateLogin, AuthController.login)

module.exports = userRouter
