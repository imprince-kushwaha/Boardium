const {DataTypes}=require("sequelize");
const sequelize = require("../db/database");

const Login=sequelize.define("Login",{
    emailId:{
        type:DataTypes.STRING,
        allowNull:false,
         unique: true,
      validate: {
        isEmail: true,
      },
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{timestamps:true})

module.exports=Login;