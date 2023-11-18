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
    fullname: {
      type: DataTypes.STRING,
      allowNull: true, // Không bắt buộc
      validate: {
        min: 6,
        max: 30
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
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true // Không bắt buộc
    }
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User' // Tên model
  }
)

module.exports = User
