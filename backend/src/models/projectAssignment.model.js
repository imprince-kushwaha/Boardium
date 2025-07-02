const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const ProjectAssignment = sequelize.define("ProjectAssignment", {
  // Sequelize will automatically add projectId and registerId as foreign keys
}, {
  timestamps: false,
});

module.exports = ProjectAssignment;
