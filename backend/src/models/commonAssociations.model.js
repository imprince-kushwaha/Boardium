const Project = require("./project.model");
const Register = require("./register.model");
const ProjectAssignment = require("./projectAssignment.model");

// Many-to-Many
Project.belongsToMany(Register, {
  through: ProjectAssignment,
  as: "assignedUsers", // project.assignedUsers
  foreignKey: "projectId",
});

Register.belongsToMany(Project, {
  through: ProjectAssignment,
  as: "assignedProjects", // user.assignedProjects
  foreignKey: "registerId",
});
