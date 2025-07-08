'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Projects', [
      {
        projectName: 'Project 1',
        projectPriority: 1,
        projectCreatedDate: '2025-07-01',
        projectCreatedBy: 1, // Assuming Register ID 1 exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectName: 'Project 2',
        projectPriority: 2,
        projectCreatedDate: '2025-07-05',
        projectCreatedBy: 2, // Assuming Register ID 2 exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Projects', null, {});
  }
};