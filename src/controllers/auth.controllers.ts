const HttpStatusCode = require('../constants/HttpStatusCode')
const { AuthServices } = require('../services/index')
const { validationResult } = require('express-validator')

class AuthController {
  // Các hằng số sử dụng trong class
  private static readonly SUCCESS_MESSAGE = 'Thành công'
  private static readonly ERROR_MESSAGE = 'Lỗi'
  // Phương thức xử lý lỗi chung
  private handleErrors(res: any, status: number, errorMessage: string) {
    return res.status(status).json({ errors: errorMessage })
  }
  // Phương thức đăng ký tài khoản
  public async register(req: any, res: any): Promise<any> {
    // Kiểm tra lỗi từ express-validator
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return this.handleErrors(res, HttpStatusCode.BAD_REQUEST, errors.array()[0].msg)
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
      console.log('exception', exception)
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
      return this.handleErrors(res, HttpStatusCode.BAD_REQUEST, errors.array()[0].msg)
    }
    try {
      // Gọi phương thức đăng nhập từ AuthService
      const response = await AuthServices.login(req.body)
      res.status(HttpStatusCode.SUCCESS).json({
        message: `${AuthController.SUCCESS_MESSAGE}`,
        success: true,
        data: response
      })
    } catch (exception: any) {
      console.log('exception', exception)
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: `${AuthController.ERROR_MESSAGE} ${exception.message}`,
        success: false
      })
    }
  }
}

module.exports = new AuthController()
