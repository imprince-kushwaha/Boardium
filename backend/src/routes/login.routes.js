const express = require("express");
const Register = require("../models/register.model");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { emailId, password } = req.body;
  if (!emailId || !password) {
    return res.status(400).json({ error: "EmailId and Password are required" });
  }
  try {
    const login = await Register.findOne({ where: { emailId } });
    console.log("first",login)
    if (!login) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if user is inactive
    if (!login.active && login.role === "user") {
      return res.status(403).json({ error: "User is deactivated. Contact admin." });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, login.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Generate JWT
    // const token = jwt.sign({ emailId }, process.env.JWT_SECRET, {
    //   expiresIn: "2h",
    // });
    const token = jwt.sign(
      {
        id: login.id,
        emailId: login.emailId,
        role: login.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // res.status(201).json({ message: "Login successful", token, login });
    res.status(201).json({
      message: "Login successful",
      token,
      user: {
        id: login.id,
        name: login.name,
        emailId: login.emailId,
        role: login.role,
      },
    });
  } catch (err) {
    res.status(400).send("Error User not Found: " + err.message);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await Register.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
