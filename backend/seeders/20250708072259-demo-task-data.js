'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add sample tasks
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Task 1',
        description: 'This is task 1',
        icon: '😎',
        status: 'todo',
        priority: 1,
        date: '2025-07-10',
        createdBy: 1, // Assuming Register ID 1 exists
        assignedTo: 2, // Assuming Register ID 2 exists
        projectId: 1, // Assuming Project ID 1 exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 2',
        description: 'This is task 2',
        icon: '🤗',
        status: 'in-progress',
        priority: 2,
        date: '2025-07-12',
        createdBy: 2, // Assuming Register ID 2 exists
        assignedTo: 1, // Assuming Register ID 1 exists
        projectId: 2, // Assuming Project ID 2 exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all data from Tasks table
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};