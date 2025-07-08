"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("Registers", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, // Use id as the primary key
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
        comment: "1 = Superadmin, 2 = Admin, 3 = User",
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
  },

  //   async down(queryInterface, Sequelize) {
  //      /**
  //      * Add reverting commands here.
  //      *
  //      * Example:
  //      * await queryInterface.dropTable('users');
  //      */

  //   const tableNames = await queryInterface.showAllTables();
  //   if (tableNames.includes('Registers')) {
  //     await queryInterface.dropTable('Register');
  //   } else {
  //     console.warn("Table 'Register' does not exist. Skipping drop.");
  //   }
  // }
  async down(queryInterface, Sequelize) {
    const tableNames = await queryInterface.showAllTables();
    const targetTable = "Registers";

    if (!tableNames.includes(targetTable)) {
      // Stop revert and keep migration in SequelizeMeta
      throw new Error(
        `⛔ Cannot revert migration: table '${targetTable}' does not exist.`
      );
    }

    await queryInterface.dropTable(targetTable);
  },
};
