const express=require('express')
var cors=reqq('cors')
require('dotenv').config();
require('./index')(app)

const app=express();
app.use(express.json());
app.use(cors());

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
