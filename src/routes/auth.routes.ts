const express = require('express')
const { AuthController, UserController } = require('../controllers/index.ts')
const { validateRegister, validateLogin } = require('../config/validate.ts')
const authenticate = require('../middlewares/auth.middlewares.ts')
const userRouter = express.Router()

/**
 * @param {*} app - express app
 */

userRouter.post('/register', validateRegister, AuthController.register)
userRouter.post('/login', validateLogin, AuthController.login)
userRouter.get('/', authenticate, UserController.getListUser)
userRouter.get('/:id', authenticate, UserController.getUserById)
userRouter.put('/:id', authenticate, UserController.updateUser)
userRouter.delete('/:id', authenticate, UserController.deleteUser)

module.exports = userRouter
