const { DataTypes } = require("sequelize");
const sequelize = require("../db/database.js");

const Register = sequelize.define(
  "Register",
  {
    // Model attributes here;
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
      type: DataTypes.ENUM("user", "admin", "superadmin"),
      defaultValue: "user", // Prevents users from registering as admin/superadmin
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: true }
);

// The table created will be "Registers" to stop auto-plurization use freezeTableName:true
module.exports = Register;
