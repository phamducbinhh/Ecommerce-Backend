const User = require('../models/users.models.ts')

class UserServices {
  public async getListUser(): Promise<any> {
    try {
      const users = await User.findAll()
      return users
    } catch (error) {
      throw new Error('Không thể lấy danh sách người dùng')
    }
  }
  public async deleteUser(id: number): Promise<any> {
    try {
      const userDeleted = await User.destroy({
        where: {
          id
        }
      })
      return userDeleted
    } catch (err) {
      throw new Error('Không thể xóa người dùng')
    }
  }
  public async getUserById(id: number): Promise<any> {
    try {
      const user = await User.findOne({
        where: {
          id
        }
      })
      return user
    } catch (error) {
      throw new Error('Không thể lấy thông tin người dùng')
    }
  }
  public async updateUser(id: number, data: any): Promise<any> {
    try {
      const updateUser = await User.update(data, {
        where: {
          id
        }
      })
      return updateUser
    } catch (error) {
      throw new Error('Không thể cập nhật thông tin người dùng')
    }
  }
}
module.exports = new UserServices()
