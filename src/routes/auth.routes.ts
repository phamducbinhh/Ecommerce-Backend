const express = require('express')
const { AuthController, UserController } = require('../controllers/index.ts')
const { validateRegister, validateLogin } = require('../config/validate.ts')
const isAuth = require('../middlewares/auth.middlewares.ts')
const userRouter = express.Router()

/**
 * @param {*} app - express app
 */

userRouter.post('/register', validateRegister, AuthController.register)
userRouter.post('/login', validateLogin, AuthController.login)
userRouter.get('/', isAuth, UserController.getListUser)
userRouter.get('/:id', isAuth, UserController.getUserById)
userRouter.put('/:id', isAuth, UserController.updateUser)
userRouter.delete('/:id', isAuth, UserController.deleteUser)

module.exports = userRouter
