const express = require("express");
const bcrypt = require("bcrypt");
const Register = require("../models/register.model");
const { verifyToken, checkRole } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/create", verifyToken, checkRole(1), async (req, res) => {
  // checkRole("superadmin")
  const { name, emailId, password, role } = req.body;

  // if (![1, 2].includes(role)) {
  if (role !== 1 && role !== 2) {
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

    res.status(201).json({ message: `User with role ${role} created`, user: newAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.get("/users", verifyToken, checkRole(1), async (req, res) => {
//   try {
//     const users = await Register.findAll({
//       attributes: ["id", "name", "emailId", "role", "active"],
//     });
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


router.get("/users", verifyToken, checkRole(1), async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    // Fetch users with pagination logic
    const users = await Register.findAll({
      attributes: ["id", "name", "emailId", "role", "active"],
      limit: limitNumber, // Limit the number of users per page
      offset: offset,     // Skip users based on the current page
    });

    // Count the total number of users (for pagination total count)
    const totalUsers = await Register.count();

    // Send the paginated data and total user count in the response
    res.status(200).json({
      users,
      totalRecords: totalUsers,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle user active status (only for users)
router.patch("/toggle/:id", verifyToken, checkRole(1), async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await Register.findByPk(userId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === 1) {
      return res.status(403).json({ message: "Cannot toggle superadmin status" });
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
