const express = require("express");
const Register = require("../models/register.model");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async(req, res) => {
  // const emailId = req.body.emailId?.toLowerCase(); //Ensure emails are always lowercase 
  // const { name, password } = req.body;
  const { name, emailId, password } = req.body;
  if (!name) {
    throw new Error("Name is required!!!");
  } else if (!emailId) {
    throw new Error("EmailId is required!!!");
  } else if (!password) {
    throw new Error("Password is required!!!");
  }
  try {
    const existingUser=await Register.findOne({where:{emailId}});
    if (existingUser) {
      return res.status(400).send("Profile with the same details already exists...");
    }
     // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); //10 is salt round
    const register=await Register.create({
      name,
      emailId,
      password: hashedPassword,
      role: "user", // Always default for public registration
    });
     res.status(201).json(register);
  } catch (err) {
    res.status(400).send("Error in Registering: " + err.message);
  }
});

module.exports = router;
