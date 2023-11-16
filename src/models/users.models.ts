const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const User = sequelize.define(
  'users',
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
