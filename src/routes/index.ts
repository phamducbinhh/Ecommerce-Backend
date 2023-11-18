const express = require('express')
const authRouter = require('./auth.routes.ts')
const rootRouter = express.Router()

rootRouter.use('/users', authRouter)

module.exports = rootRouter
