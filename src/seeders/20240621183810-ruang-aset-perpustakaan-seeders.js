'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ruang_aset_perpustakaan', [
      {
        asset_code: 'PERPUS001',
        asset_name: 'Air Conditioner 1',
        category_id: 1,
        asset_price: 1500000,
        purchase_date: new Date('2023-01-15'),
        asset_condition: 'Berfungsi Baik',
        asset_type: 'Tidak Dapat Dipindahkan',
        last_maintenance_date: new Date('2024-01-15'),
        maintenance_internal_days: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        asset_code: 'PERPUS002',
        asset_name: 'Air Conditioner 2',
        category_id: 1,
        asset_price: 2000000,
        purchase_date: new Date('2023-01-15'),
        asset_condition: 'Baru',
        asset_type: 'Tidak Dapat Dipindahkan',
        last_maintenance_date: new Date('2024-01-15'),
        maintenance_internal_days: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        asset_code: 'PERPUS003',
        asset_name: 'Air Conditioner 3',
        category_id: 1,
        asset_price: 3000000,
        purchase_date: new Date('2023-01-15'),
        asset_condition: 'Baru',
        asset_type: 'Tidak Dapat Dipindahkan',
        last_maintenance_date: new Date('2024-01-15'),
        maintenance_internal_days: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        asset_code: 'PERPUS004',
        asset_name: 'Air Conditioner 4',
        category_id: 1,
        asset_price: 1500000,
        purchase_date: new Date('2021-01-15'),
        asset_condition: 'Perlu Pemeliharaan',
        asset_type: 'Tidak Dapat Dipindahkan',
        last_maintenance_date: new Date('2022-01-15'),
        maintenance_internal_days: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        asset_code: 'PERPUS005',
        asset_name: 'Meja Kaca',
        category_id: 1,
        asset_price: 500000,
        purchase_date: new Date('2020-01-15'),
        asset_condition: 'Berfungsi Baik',
        asset_type: 'Tidak Dapat Dipindahkan',
        last_maintenance_date: new Date('2023-01-15'),
        maintenance_internal_days: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ruang_aset_perpustakaan', null, {});
  }
};
