'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ruang_aset_musholla', [
      {
        asset_code: 'MUS001',
        asset_name: 'Air Conditioner 1',
        category_id: 1,
        asset_price: 1500000,
        purchase_date: new Date('2023-01-15'),
        asset_condition: 'Berfungsi Baik',
        asset_type: 'Tidak Dapat Dipindahkan',
        last_maintenance_date: new Date('2024-01-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        asset_code: 'MUS002',
        asset_name: 'Air Conditioner 2',
        category_id: 1,
        asset_price: 2000000,
        purchase_date: new Date('2023-01-15'),
        asset_condition: 'Baru',
        asset_type: 'Tidak Dapat Dipindahkan',
        last_maintenance_date: new Date('2024-01-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        asset_code: 'MUS003',
        asset_name: 'Air Conditioner 3',
        category_id: 1,
        asset_price: 3000000,
        purchase_date: new Date('2023-01-15'),
        asset_condition: 'Baru',
        asset_type: 'Tidak Dapat Dipindahkan',
        last_maintenance_date: new Date('2024-01-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        asset_code: 'MUS004',
        asset_name: 'Sound System 1',
        category_id: 1,
        asset_price: 1500000,
        purchase_date: new Date('2021-01-15'),
        asset_condition: 'Perlu Pemeliharaan',
        asset_type: 'Dapat Dipindahkan',
        last_maintenance_date: new Date('2022-01-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        asset_code: 'MUS005',
        asset_name: 'Projector 1',
        category_id: 1,
        asset_price: 300000,
        purchase_date: new Date('2020-01-15'),
        asset_condition: 'Berfungsi Baik',
        asset_type: 'Tidak Dapat Dipindahkan',
        last_maintenance_date: new Date('2023-01-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ruang_aset_musholla', null, {});
  }
};
