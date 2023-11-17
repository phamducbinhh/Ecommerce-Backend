const jwt = require('jsonwebtoken')
const HttpStatusCode = require('../constants/HttpStatusCode.ts')

interface JwtObject {
  exp: number
}

// Middleware kiểm tra xác thực token
const isAuth = async (req: any, res: any, next: any): Promise<any> => {
  // Lấy token từ header của request
  const token: string | undefined = req.headers?.authorization?.split(' ')[1]
  // Nếu không có token, trả về lỗi
  if (!token) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Không có token, truy cập bị từ chối' })
  }
  try {
    // Giải mã token và kiểm tra tính hợp lệ
    const jwtObject: JwtObject = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtObject
    // Giải mã token và kiểm tra tính hợp lệ
    const isExpired: boolean = Date.now() >= jwtObject.exp * 1000
    // Nếu token hết hạn, trả về lỗi
    if (isExpired) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: 'Token hết hạn'
      })
      res.end()
    } else {
      // Nếu token hợp lệ, chuyển sang middleware tiếp theo
      next()
    }
  } catch (exception: any) {
    // Nếu có lỗi xảy ra trong quá trình xác thực token, trả về lỗi
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: exception.message
    })
  }
}

module.exports = isAuth
