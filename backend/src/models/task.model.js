// models/Task.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db/database.js");

const Task = sequelize.define("Task",
  {
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
      defaultValue: 2, // 2 = Medium
      validate: {
        min: 1,
        max: 3,
      },
      comment: "1 = High, 2 = Medium, 3 = Low",
    },
     date: {
      type: DataTypes.DATEONLY, // stores only YYYY-MM-DD
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Task;
