'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RuangAsetAuditorium extends Model {
    static associate(models) {
      RuangAsetAuditorium.belongsTo(models.CategoryAsset, {
        foreignKey: 'category_id',
        as: 'asset_category'
      });
    }
  }

  RuangAsetAuditorium.init({
    asset_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    asset_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    asset_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    asset_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purchase_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    asset_condition: {
      type: DataTypes.ENUM,
      values: ['Baru', 'Berfungsi Baik', 'Perlu Pemeliharaan', 'Rusak', 'Tidak Berfungsi'],
      allowNull: false
    },
    asset_type: {
      type: DataTypes.ENUM,
      values: ['Dapat Dipindahkan', 'Tidak Dapat Dipindahkan'],
      allowNull: false
    },
    last_maintenance_date: {
      type: DataTypes.DATE,
      allowNull: true // Bisa diisi null karena tidak semua aset mungkin memiliki tanggal pemeliharaan terakhir
    }
  }, {
    sequelize,
    modelName: 'RuangAsetAuditorium',
    tableName: 'ruang_aset_auditorium',
    timestamps: true,  // Menambahkan createdAt dan updatedAt
  });

  return RuangAsetAuditorium;
};



