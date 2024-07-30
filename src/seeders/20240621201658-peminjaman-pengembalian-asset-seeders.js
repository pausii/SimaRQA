'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('peminjaman_pengembalian_asset', [
      {
        borrowed_asset_code: 'AUD004',
        borrowed_asset_name: 'Sound System 1',
        borrowed_name: 'Hana',
        used_by_program: 'MIQA',
        due_date: new Date('2024-06-15T12:00:00'),    // Contoh: Tambahkan jam 12:00:00
        status: 'Dikembalikan',
        notes: 'Digunakan untuk Acara Outdoor MIQA.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        borrowed_asset_code: 'MUS005',
        borrowed_asset_name: 'Projector 1',
        borrowed_name: 'Diana',
        used_by_program: 'MIQA',
        due_date: new Date('2024-06-15T14:45:00'),    // Contoh: Tambahkan jam 14:45:00
        return_date: null,
        status: 'Dikembalikan',
        notes: 'Digunakan untuk presentasi MIQA.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('peminjaman_pengembalian_asset', null, {});
  }
};