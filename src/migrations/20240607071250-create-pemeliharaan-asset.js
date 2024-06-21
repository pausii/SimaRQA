'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pemeliharaan_asset', {
      maintenance_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      maintenance_asset_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      maintenance_asset_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      maintenance_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      maintenance_asset_condition: {
        type: Sequelize.ENUM,
        values: ['Baru', 'Berfungsi Baik', 'Perlu Pemeliharaan', 'Rusak', 'Tidak Berfungsi'],
        allowNull: false
      },
      price_maintenance: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      details_maintenance: {
        type: Sequelize.TEXT,
        allowNull: false
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
    await queryInterface.dropTable('pemeliharaan_asset');
  }
};
