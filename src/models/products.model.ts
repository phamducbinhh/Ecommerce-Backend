const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.ts')
const ProductsCatgory = require('./productsCategory.model.ts')

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
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: ProductsCatgory,
        key: 'id'
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    countInStock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numReviews: {
      type: DataTypes.INTEGER,
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

Products.belongsTo(ProductsCatgory, { foreignKey: 'category_id' })

Products.sync({ alter: true })

module.exports = Products
