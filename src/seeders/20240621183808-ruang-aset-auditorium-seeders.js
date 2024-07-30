'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ruang_aset_auditorium', [
      {
        asset_code: 'AUD001',
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
        asset_code: 'AUD002',
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
        asset_code: 'AUD003',
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
        asset_code: 'AUD004',
        asset_name: 'Sound System 1',
        category_id: 1,
        asset_price: 1500000,
        purchase_date: new Date('2021-01-15'),
        asset_condition: 'Perlu Pemeliharaan',
        asset_type: 'Dapat Dipindahkan',
        last_maintenance_date: new Date('2022-01-15'),
        maintenance_internal_days: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        asset_code: 'AUD005',
        asset_name: 'Meja Auditorium',
        category_id: 2,
        asset_price: 3000000,
        purchase_date: new Date('2020-01-15'),
        asset_condition: 'Berfungsi Baik',
        asset_type: 'Dapat Dipindahkan',
        last_maintenance_date: new Date('2023-01-15'),
        maintenance_internal_days: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ruang_aset_auditorium', null, {});
  }
};
