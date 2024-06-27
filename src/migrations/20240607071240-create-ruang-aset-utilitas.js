'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ruang_aset_utilitas', {
      asset_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      asset_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      asset_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      asset_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      purchase_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      asset_condition: {
        type: Sequelize.ENUM('Baru', 'Berfungsi Baik', 'Perlu Pemeliharaan', 'Rusak', 'Tidak Berfungsi'),
        allowNull: false
      },
      asset_type: {
        type: Sequelize.ENUM('Dapat Dipindahkan', 'Tidak Dapat Dipindahkan'),
        allowNull: false
      },
      last_maintenance_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ruang_aset_utilitas');
  }
};
