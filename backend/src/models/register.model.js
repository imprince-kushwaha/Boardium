const { DataTypes } = require("sequelize");
const sequelize = require("../db/database.js");

const Register = sequelize.define(
  "Register",
  {
    // Model attributes here;
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
    // role: {
    //   type: DataTypes.ENUM("user", "admin", "superadmin"),
    //   defaultValue: "user", // Prevents users from registering as admin/superadmin
    // },

    // Best way to do is on basis of user instead of role (for future use)

    role: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
      validate: {
        min: 1,
        max: 3,
      },
      comment: "1 = Superadmin, 2 = Admin, 3 = User",
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
