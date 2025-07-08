'use strict';

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('john@123', 10);
    const hashedPassword2 = await bcrypt.hash('jane@123', 10);
    await queryInterface.bulkInsert('Registers', [
      {
        name: 'John Doe',
        emailId: 'john.doe@example.com',
        password: hashedPassword1,
        role: 3, // User role
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        emailId: 'jane.smith@example.com',
        password: hashedPassword2,
        role: 2, // Admin role
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Registers', null, {});
  }
};