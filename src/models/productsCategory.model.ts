const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database.ts')

class ProductsCatgory extends Model {}

ProductsCatgory.init(
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
    tableName: 'productsCatgory',
    modelName: 'ProductsCatgory'
  }
)

ProductsCatgory.sync({ alter: true })

module.exports = ProductsCatgory
