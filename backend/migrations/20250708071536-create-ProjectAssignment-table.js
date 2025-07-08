'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableName = 'ProjectAssignments';
    const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
    if (!tableExists) {
      await queryInterface.createTable('ProjectAssignments', {
        projectId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Projects', // references Project model's table
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        registerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Registers', // references Register model's table
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
      });
    } else {
      console.log("Table 'ProjectAssignments' already exists.");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProjectAssignments');
  }
};
