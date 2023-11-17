const express = require('express')
const { AuthController } = require('../controllers/index.ts')
const { validateRegister, validateLogin } = require('../config/validate.ts')
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
