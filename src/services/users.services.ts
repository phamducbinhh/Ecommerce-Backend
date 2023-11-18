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
      const user = await User.findOne({
        where: {
          id
        }
      })
      if (!user) {
        throw new Error('Không tìm thấy người dùng với id đã cho')
      }
      await User.destroy({
        where: {
          id
        }
      })
    } catch (error: any) {
      throw new Error(error.message)
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
  public async updateUser(req: any): Promise<any> {
    const { fullname, email, phone, address } = req.body
    const { id } = req.params
    try {
      await User.update(
        {
          fullname,
          email,
          phone,
          address
        },
        {
          where: {
            id: id
          }
        }
      )
      // Lấy dữ liệu mới nhất của người dùng sau khi cập nhật
      const updatedUser = await User.findOne({
        where: {
          id: id
        },
        attributes: ['id', 'fullname', 'email', 'phone', 'address']
      })
      return updatedUser
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
module.exports = new UserServices()
