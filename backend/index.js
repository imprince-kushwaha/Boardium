const registerRoutes=require('./src/routes/register.routes')
const loginRoutes=require('./src/routes/login.routes')
const taskRoutes=require('./src/routes/task.routes')

module.exports = (app) => {
  app.use("/register", registerRoutes);
  app.use("/login", loginRoutes);
  app.use("/task", taskRoutes);
};