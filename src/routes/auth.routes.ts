const express = require('express')
const { AuthController } = require('../controllers/index')
const { validateRegister, validateLogin } = require('../config/validate')
const router = express.Router()

/**
 * @param {*} app - express app
 */

const AuthRoutesApi = (app: any) => {
  router.post('/register', validateRegister, AuthController.register)
  router.post('/login', validateLogin, AuthController.login)
  return app.use('/api/v1/', router)
}

module.exports = AuthRoutesApi
