'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ruang_aset_utilitas', [
      {
        asset_code: 'UTI001',
        asset_name: 'Wastafel 1',
        category_id: 5,
        asset_price: 2000000,
        purchase_date: new Date('2023-01-15'),
        asset_condition: 'Berfungsi Baik',
        asset_type: 'Tidak Dapat Dipindahkan',
        last_maintenance_date: new Date('2024-01-15'),
        maintenance_internal_days: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        asset_code: 'UTI002',
        asset_name: 'Kloset 1',
        category_id: 5,
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
        asset_code: 'UTI003',
        asset_name: 'Kloset 2',
        category_id: 5,
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
        asset_code: 'UTI004',
        asset_name: 'Kloset 3',
        category_id: 5,
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
        asset_code: 'UTI005',
        asset_name: 'Wastafel 2',
        category_id: 5,
        asset_price: 2000000,
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
    await queryInterface.bulkDelete('ruang_aset_utilitas', null, {});
  }
};
