const registerRoutes = require("./src/routes/register.routes");
const loginRoutes = require("./src/routes/login.routes");
const taskRoutes = require("./src/routes/task.routes");
const adminRoutes=require("./src/routes/admin.routes")
const projectRoutes=require("./src/routes/project.routes")

module.exports = (app) => {
  app.use("/register", registerRoutes);
  app.use("/login", loginRoutes);
  app.use("/task", taskRoutes);
  app.use("/admin", adminRoutes); // Protected
  app.use("/project", projectRoutes);

};