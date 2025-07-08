"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableName = "Tasks";
    const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
    if (!tableExists) {
      await queryInterface.createTable("Tasks", {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        icon: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "todo",
        },
        priority: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 2,
          validate: {
            min: 1,
            max: 3,
          },
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Registers", // references Register model's table
            key: "id",
          },
        },
        assignedTo: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "Registers", // references Register model's table
            key: "id",
          },
        },
        projectId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "Projects", // references Project model's table
            key: "id",
          },
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
      console.log("Table 'Tasks' already exists.");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tasks");
  },
};
