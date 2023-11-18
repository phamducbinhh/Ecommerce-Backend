const HttpStatusCode = require('../constants/HttpStatusCode')
const { UserServices } = require('../services/index.ts')

class UserController {
  // Các hằng số sử dụng trong class
  private static readonly SUCCESS_MESSAGE = 'Thành công'
  private static readonly ERROR_MESSAGE = 'Lỗi'
  public async getListUser(req: any, res: any): Promise<any> {
    try {
      const user = await UserServices.getListUser(req)
      res.status(HttpStatusCode.SUCCESS).json({
        message: `${UserController.SUCCESS_MESSAGE}`,
        success: true,
        data: user
      })
    } catch (exception: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: `${UserController.ERROR_MESSAGE} ${exception.message}`,
        success: false
      })
    }
  }
  public async getUserById(req: any, res: any): Promise<any> {
    try {
      const user = await UserServices.getUserById(req.params.id)
      res.status(HttpStatusCode.SUCCESS).json({
        message: `${UserController.SUCCESS_MESSAGE}`,
        success: true,
        data: user
      })
    } catch (exception: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: `${UserController.ERROR_MESSAGE} ${exception.message}`,
        success: false
      })
    }
  }
}

module.exports = new UserController()
