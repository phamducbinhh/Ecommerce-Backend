const jwt = require('jsonwebtoken')

const generateToken = (id: number): any => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

module.exports = { generateToken }
