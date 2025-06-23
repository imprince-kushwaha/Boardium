const registerRoutes=require('./src/routes/register.routes')
const loginRoutes=require('./src/routes/login.routes')

module.exports = (app) => {
  app.use("/register", registerRoutes);
  app.use("/login", loginRoutes);
};