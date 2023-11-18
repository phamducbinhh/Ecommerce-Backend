const User = require('../models/users.models.ts')

class UserServices {
  public async getListUser(req: any): Promise<any> {
    try {
      const page = parseInt(req.query.page || 1)
      const limit = parseInt(req.query.limit || 10)
      const offset = (page - 1) * limit
      const { rows, count } = await User.findAndCountAll({
        // là một mảng chứa tên các trường (fields) mà bạn muốn lấy từ cơ sở dữ liệu khi thực hiện truy vấn
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
      if (!user) {
        throw new Error('Không tìm thấy người dùng với id đã cho')
      }
      const userId = await User.findOne({
        where: {
          id
        },
        // là một mảng chứa tên các trường (fields) mà bạn muốn lấy từ cơ sở dữ liệu khi thực hiện truy vấn
        attributes: ['id', 'fullname', 'username', 'email', 'phone', 'address']
      })
      return userId
    } catch (error: any) {
      throw new Error(error.message)
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
