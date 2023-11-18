const bcrypt = require('bcrypt')
const User = require('../models/users.models.ts')
const { generateToken } = require('../config/generateToken.ts')

interface RegistrationData {
  email: string
  password: string
  username?: string
  phone?: number
}

class AuthServices {
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.SALT_ROUNDS as string, 10)
    return bcrypt.hash(password, saltRounds)
  }

  private async isEmailExists(email: string): Promise<boolean> {
    const options: any = { where: { email: email } }
    const existingUser = await User.findOne(options)
    return !!existingUser
  }

  private async isPhoneExists(phone: number | undefined): Promise<boolean> {
    const existingUser = await User.findOne({
      where: { phone: phone }
    })
    return !!existingUser
  }

  private async comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword)
  }

  public async register({ email, password, username, phone }: RegistrationData): Promise<any> {
    try {
      if (await this.isEmailExists(email)) {
        throw new Error('Email đã tồn tại trong hệ thống')
      }
      if (await this.isPhoneExists(phone)) {
        throw new Error('Số điện thoại đã tồn tại trong hệ thống')
      }
      const hashPassword = await this.hashPassword(password)
      const response = await User.create({
        email,
        username,
        phone,
        password: hashPassword
      })
      // Loại bỏ trường password trước khi trả về response
      const responseData = {
        id: response.id,
        email: response.email,
        username: response.username,
        phone: response.phone,
        updatedAt: response.updatedAt,
        createdAt: response.createdAt
      }
      // Trả về một đối tượng với các trường dataValues và password được ẩn đi
      return responseData
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async login({ username, password }: RegistrationData): Promise<any> {
    try {
      const user = await User.findOne({
        where: { username: username }
      })
      if (!user) {
        throw new Error('Tài khoản không tồn tại trong hệ thống!')
      }
      const isPasswordMatch = await this.comparePassword(password, user.password)
      if (!isPasswordMatch) {
        throw new Error('Mật khẩu không chính xác!')
      }
      return {
        id: user.id,
        email: user.email,
        username: user.username,
        token: generateToken(user.id)
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async logout(res: any): Promise<any> {
    try {
      // Xóa cookie refresh token bằng cách sử dụng res.clearCookie
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict'
      })
      return {
        message: 'Logout thành công',
        success: true
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new AuthServices()
