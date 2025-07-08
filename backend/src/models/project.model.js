// const { DataTypes } = require("sequelize");
// const sequelize = require("../db/database");
// const Register = require("./register.model");

// const Project = sequelize.define(
//   "Project",
//   {
//     projectName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     projectPriority: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       defaultValue: 2,
//       validate: {
//         min: 1,
//         max: 5,
//       },
//       comment: "1 = Urgent , 2 = Routine ,3 = High, 4 = Medium, 5 = Low",
//     },
//     projectCreatedDate: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },
//     projectCreatedBy: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: Register,
//         key: "id",
//       },
//     },
//     projectAssignedTo: {
//       type: DataTypes.INTEGER,
//       allowNull: true, // can be null or required
//       references: {
//         model: Register,
//         key: "id",
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = Project;

const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true, // Use id as the primary key
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
      comment: "1 = Urgent , 2 = Routine ,3 = High, 4 = Medium, 5 = Low",
    },
    projectCreatedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    projectCreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Project;
