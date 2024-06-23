'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('category_assets', [
            {
                category_name: 'Elektronik',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                category_name: 'Furniture',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                category_name: 'Alat Belajar',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                category_name: 'Suply Kantor',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                category_name: 'Sanitasi',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },
  
    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('category_assets', null, {});
    }
  };
  