const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.ts')

class Products extends Model {}

Products.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'products',
    modelName: 'Products'
  }
)

// Đồng bộ hóa cơ sở dữ liệu để tạo bảng
;(async () => {
  try {
    await Products.sync()
    console.log('Bảng products đã được tạo.')
  } catch (error) {
    console.error('Lỗi khi tạo bảng products:', error)
  }
})()

module.exports = Products
