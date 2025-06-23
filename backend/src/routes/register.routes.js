const express = require("express");
const Register = require("../models/register.model");
const router = express.Router();

router.post("/", async(req, res) => {
  const { name, emailId, password } = req.body;
  if (!name) {
    throw new Error("Name is required!!!");
  } else if (!emailId) {
    throw new Error("EmailId is required!!!");
  } else if (!password) {
    throw new Error("Password is required!!!");
  }
  try {
    const existingUser=await Register.findOne({where:name, emailId, password});
    if (existingUser) {
      return res.status(400).send("Profile with the same details already exists...");
    }
    const register=await Register.create(req.body);
     res.status(201).json(register);
  } catch (err) {
    res.status(400).send("Error in Registering: " + err.message);
  }
});

module.exports = router;
