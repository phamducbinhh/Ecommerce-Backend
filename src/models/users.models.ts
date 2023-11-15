const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class User extends Model {
  public id!: number
  public email!: string
  public username!: string
  public password!: string
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  }
)

sequelize
  .sync()
  .then(() => {
    console.log('Bảng đã được tạo.')
  })
  .catch((error: any) => {
    console.error('Lỗi khi tạo bảng:', error)
  })

module.exports = User
