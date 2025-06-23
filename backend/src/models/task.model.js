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
  },
  {
    timestamps: true,
  }
);

module.exports = Task;
