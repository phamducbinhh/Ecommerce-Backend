const bcrypt = require('bcrypt')
const User = require('../models/users.models')
const { generateToken } = require('../config/generateToken')

interface RegistrationData {
  email: string
  password: string
  username?: string
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

  private async comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword)
  }

  public async register({ email, password, username }: RegistrationData): Promise<any> {
    try {
      if (await this.isEmailExists(email)) {
        throw new Error('Email đã tồn tại trong hệ thống')
      }

      const hashPassword = await this.hashPassword(password)
      const response = await User.create({
        email,
        username,
        password: hashPassword
      })

      // Trả về một đối tượng với các trường dataValues và password được ẩn đi
      return {
        ...response.dataValues,
        password: 'Not show'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  public async login({ email, password }: RegistrationData): Promise<any> {
    try {
      const user = await User.findOne({
        where: { email: email }
      })
      if (!user) {
        throw new Error('Email không tồn tại trong hệ thống')
      }
      const isPasswordMatch = await this.comparePassword(password, user.password)
      if (!isPasswordMatch) {
        throw new Error('Mật khẩu không chính xác')
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
}

module.exports = new AuthServices()
