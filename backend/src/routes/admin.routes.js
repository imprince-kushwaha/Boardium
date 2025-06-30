const express = require("express");
const bcrypt = require("bcrypt");
const Register = require("../models/register.model");
const { verifyToken, checkRole } = require("../middlewares/auth.middleware");
const router = express.Router();

// Only accessible by superadmin
router.post("/create", verifyToken, checkRole("superadmin"), async (req, res) => {
  const { name, emailId, password, role } = req.body;

  if (!["admin", "superadmin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const existing = await Register.findOne({ where: { emailId } });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Register.create({
      name,
      emailId: emailId.toLowerCase(),
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: `${role} created`, user: newAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/users", verifyToken, checkRole("superadmin"), async (req, res) => {
  try {
    const users = await Register.findAll({
      attributes: ["id", "name", "emailId", "role", "active"],
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch("/toggle/:id", verifyToken, checkRole("superadmin"), async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await Register.findByPk(userId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "user") {
      return res.status(403).json({ message: "Can only toggle normal users" });
    }

    user.active = !user.active;
    await user.save();

    res.status(200).json({
      message: `User is now ${user.active ? "active" : "inactive"}`,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        active: user.active,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
