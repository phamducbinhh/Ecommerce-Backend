const User = require('../models/users.models.ts')

class UserServices {
  public async getListUser(req: any): Promise<any> {
    try {
      const page = parseInt(req.query.page || 1)
      const limit = parseInt(req.query.limit || 10)
      const offset = (page - 1) * limit
      const { rows, count } = await User.findAndCountAll({
        attributes: ['id', 'fullname', 'username', 'email', 'phone', 'address'],
        offset,
        limit
      })
      return {
        totalItems: count,
        itemsPerPage: limit,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        items: rows
      }
    } catch (error: any) {
      throw new Error(error.message)
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
