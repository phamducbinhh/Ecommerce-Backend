const bcrypt = require('bcrypt')
const User = require('../models/users.models')
const { generateToken } = require('../config/generateToken')

const hashPasswordUser = async (password: any) => {
  return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS as any))
}

const isEmailExists = async (email: any) => {
  const existingUser = await User.findOne({
    where: { email: email }
  })
  return !!existingUser
}

const comparePassword = async (password: any, hashPassword: any) => {
  return await bcrypt.compare(password, hashPassword) //true or false
}

const registerNewsUser = async ({ email, password, username }: any) => {
  try {
    // Kiểm tra xem email hoặc phone đã tồn tại trong cơ sở dữ liệu
    if (await isEmailExists(email)) {
      throw new Error('Email đã tồn tại trong hệ thống')
    }

    const hashPassword = await hashPasswordUser(password)
    const newUser = await User.create({
      email,
      username,
      password: hashPassword
    })
    return {
      ...newUser.dataValues,
      password: 'Not show'
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const loginNewsUser = async ({ email, password }: any) => {
  try {
    const user = await User.findOne({
      where: { email: email }
    })
    if (!user) {
      throw new Error('Email không tồn tại trong hệ thống')
    }
    const isPasswordMatch = await comparePassword(password, user.password)
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

module.exports = {
  registerNewsUser,
  loginNewsUser
}
