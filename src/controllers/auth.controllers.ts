const HttpStatusCode = require('../constants/HttpStatusCode')
const { authService } = require('../services/auth.services')
const { validationResult } = require('express-validator')

const registerNewsUser = async (req: any, res: any) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array()[0].msg })
  }
  try {
    const user = await authService.registerNewsUser(req.body)
    res.status(HttpStatusCode.CREATED).json({
      message: 'Đăng ký tài khoản thành công',
      success: true,
      data: user
    })
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
      success: false
    })
  }
}

const loginNewsUser = async (req: any, res: any) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array()[0].msg })
  }
  try {
    const user = await authService.loginNewsUser(req.body)
    res.status(HttpStatusCode.SUCCESS).json({
      message: 'Đăng nhập thành công',
      success: true,
      data: user
    })
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
      success: false
    })
  }
}

module.exports = {
  registerNewsUser,
  loginNewsUser
}
