'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const hashedPassword1 = await bcrypt.hash('plain_password1', 10);
    const hashedPassword2 = await bcrypt.hash('plain_password2', 10);

    await queryInterface.bulkInsert('Users', [
        {
        username: 'admin1',
        password: hashedPassword1, // Biasanya password dihash
        role: 'administrator',
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '1234567890',
        address: '123 Admin Street',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'division_user1',
        password: hashedPassword2, // Biasanya password dihash
        role: 'division',
        first_name: 'Jane',
        last_name: 'Doe',
        phone_number: '0987654321',
        address: '456 Division Avenue',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
},

async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
}
};
