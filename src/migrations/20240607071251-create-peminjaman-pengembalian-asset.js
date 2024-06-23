'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('peminjaman__pengembalian_asset', {
      borrowed_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      borrowed_asset_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      borrowed__asset_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      used_by_program: {
        type: Sequelize.ENUM,
        values: ['MIQA', 'ATA', 'Sedekah Sampah', 'Tahsin', 'TPQ'],
        allowNull: false
      },
      borrowed_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      return_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Dipinjam', 'Dikembalikan'],
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('peminjaman__pengembalian_asset');
  }
};