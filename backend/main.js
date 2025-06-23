const express=require('express')
var cors=require('cors');
const sequelize = require('./src/db/database');
require('dotenv').config();

const app=express();
app.use(express.json());
app.use(cors());
require('./index')(app)

// app.listen(5000, () => console.log('Server running on http://localhost:5000'));
sequelize.sync({ force: false })  // Use { alter: true } in dev
  .then(() => {
    console.log("Database Connected & Synced...");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
