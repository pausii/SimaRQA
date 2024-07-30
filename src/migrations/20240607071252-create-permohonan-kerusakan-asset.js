'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('permohonan_kerusakan_asset', {
      request_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      request_asset_code: {
          type: Sequelize.STRING,
          allowNull: false
      },
      request_asset_name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      damage_date: {
          type: Sequelize.DATE,
          allowNull: false,
      },
      status_confirmation: {
          type: Sequelize.ENUM,
          values: ['Sedang Dikonfirmasi', 'Sudah Dikonfirmasi'],
          defaultValue: 'Sedang Dikonfirmasi',
          allowNull: false
      },
      notes: {
          type: Sequelize.TEXT,
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
    await queryInterface.dropTable('permohonan_kerusakan_asset');
  }
};
