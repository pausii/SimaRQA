'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pemeliharaan_asset', [
      {
        maintenance_asset_code: 'MUS001',
        maintenance_asset_name: 'Air Conditioner 1',
        maintenance_date: new Date('2024-04-20'),
        maintenance_asset_condition: 'Perlu Pemeliharaan',
        price_maintenance: 500000,
        details_maintenance: 'Perbaikan kompresor dan pengisian freon.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        maintenance_asset_code: 'PERPUS005',
        maintenance_asset_name: 'Meja Kaca',
        maintenance_date: new Date('2024-04-20'),
        maintenance_asset_condition: 'Berfungsi Baik',
        price_maintenance: 500000,
        details_maintenance: 'Perbaikan perekat kaca dengan batang kayu yang sudah habis dengan menggunakan lem kaca.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        maintenance_asset_code: 'AUD004',
        maintenance_asset_name: 'Sound System 1',
        maintenance_date: new Date('2024-04-20'),
        maintenance_asset_condition: 'Berfungsi Baik',
        price_maintenance: 100000,
        details_maintenance: 'Pergantian Baterai Sound System.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pemeliharaan_asset', null, {});
  }
};
