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
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    countInStock: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    rating: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    numReviews: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    defaultScope: {
      attributes: { exclude: ['updated_at', 'updated_by', 'deleted_at', 'deleted_by'] }
    },
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
