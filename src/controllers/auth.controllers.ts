const HttpStatusCode = require('../constants/HttpStatusCode')
const { AuthServices } = require('../services/index.ts')
const { validationResult } = require('express-validator')
const { generateRefreshToken } = require('../config/refreshToken.ts')

class AuthController {
  // Các hằng số sử dụng trong class
  private static readonly SUCCESS_MESSAGE = 'Thành công'
  private static readonly ERROR_MESSAGE = 'Lỗi'
  // Phương thức đăng ký tài khoản
  public async register(req: any, res: any): Promise<any> {
    // Kiểm tra lỗi từ express-validator
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array()[0].msg })
    }
    try {
      // Gọi phương thức đăng ký từ AuthService
      const response = await AuthServices.register(req.body)
      res.status(HttpStatusCode.CREATED).json({
        message: `${AuthController.SUCCESS_MESSAGE}`,
        success: true,
        data: response
      })
    } catch (exception: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: `${AuthController.ERROR_MESSAGE} ${exception.message}`,
        success: false
      })
    }
  }

  // Phương thức đăng nhập
  public async login(req: any, res: any): Promise<any> {
    // Kiểm tra lỗi từ express-validator
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array()[0].msg })
    }
    try {
      // Gọi phương thức đăng nhập từ AuthService
      const response = await AuthServices.login(req.body)
      const refreshToken = generateRefreshToken(response.id)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
        maxAge: 3 * 24 * 60 * 60 * 1000
      })
      res.status(HttpStatusCode.SUCCESS).json({
        message: `${AuthController.SUCCESS_MESSAGE}`,
        success: true,
        data: response
      })
    } catch (exception: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: `${AuthController.ERROR_MESSAGE} ${exception.message}`,
        success: false
      })
    }
  }
}

module.exports = new AuthController()
