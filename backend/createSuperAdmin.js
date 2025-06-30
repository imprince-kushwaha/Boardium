require("dotenv").config();
const bcrypt = require("bcrypt");
const sequelize = require("./src/db/database");
const Register = require("./src/models/register.model");

(async () => {
  try {
    await sequelize.sync(); // Ensure DB is ready

    const existing = await Register.findOne({ where: { emailId: "superadmin@example.com" } });
    if (existing) {
      console.log("Superadmin already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("supersecurepassword2", 10);

    const superadmin = await Register.create({
      name: "SuperAdmin2",
      emailId: "superadmin2@example.com",
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("✅ Superadmin created successfully:");
    console.log(superadmin.toJSON());
  } catch (err) {
    console.error("Error creating superadmin:", err.message);
  } finally {
    process.exit();
  }
})();


// node createSuperAdmin.js == to execute it
