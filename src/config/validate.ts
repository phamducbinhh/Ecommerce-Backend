const { body } = require('express-validator')

const validateRegister = [
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('username').notEmpty().withMessage('Tên người dùng không được trống'),
  body('password').isLength({ min: 5 }).withMessage('Mật khẩu phải có ít nhất 5 ký tự')
]

const validateLogin = [
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('password').isLength({ min: 5 }).withMessage('Mật khẩu phải có ít nhất 5 ký tự')
]

module.exports = {
  validateRegister,
  validateLogin
}
