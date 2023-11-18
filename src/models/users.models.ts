const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.ts')

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 10,
        max: 50,
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9]+$/
      }
    }
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User' // Tên model
  }
)

// Đồng bộ hóa cơ sở dữ liệu để tạo bảng
;(async () => {
  try {
    await sequelize.sync()
    console.log('Bảng đã được tạo.')
  } catch (error) {
    console.error('Lỗi khi tạo bảng:', error)
  }
})()

module.exports = User
