const express = require('express')
const { authController } = require('../controllers/index')
const { validateRegister, validateLogin } = require('../config/validate')
const router = express.Router()

/**
 * @param {*} app - express app
 */

const AuthRoutesApi = (app: any) => {
  router.post('/register', validateRegister, authController.registerNewsUser)
  router.post('/login', validateLogin, authController.loginNewsUser)
  return app.use('/api/v1/', router)
}

module.exports = AuthRoutesApi
