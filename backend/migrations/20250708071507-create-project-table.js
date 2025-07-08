"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableName = "Projects";
    const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
    if (!tableExists) {
      await queryInterface.createTable("Projects", {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        projectName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        projectPriority: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 2,
          validate: {
            min: 1,
            max: 5,
          },
        },
        projectCreatedDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        projectCreatedBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    } else {
      console.log("Table 'Projects' already exists.");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Projects");
  },
};
