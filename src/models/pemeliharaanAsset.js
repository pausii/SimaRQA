'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PemeliharaanAsset extends Model {
    static associate(models) {

    }
  }

  PemeliharaanAsset.init({
    maintenance_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    maintenance_asset_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    maintenance_asset_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    maintenance_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    maintenance_asset_condition: {
        type: DataTypes.ENUM,
        values: ['Baru', 'Berfungsi Baik', 'Perlu Pemeliharaan', 'Rusak', 'Tidak Berfungsi'],
        allowNull: false
    },
    price_maintenance: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    details_maintenance: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PemeliharaanAsset',
    tableName: 'pemeliharaan_asset',
    timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
  });

  return PemeliharaanAsset;
};


