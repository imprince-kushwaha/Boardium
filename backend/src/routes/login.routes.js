const express=require('express');
const Register = require('../models/register.model');
const router=express.Router();

router.get('/',async(req,res)=>{
    const { emailId, password } = req.body;
    if (!emailId) {
        throw new Error("EmailId is Required!!!")
    }else if (!password) {
        throw new Error("Password is Required!!!")
    }
    try {
        const login=await Register.findOne({where:emailId, password})
        res.status(201).json(login);
    } catch (err) {
        res.status(400).send("Error User not Found: "+err.message)
    }
})

module.exports=router;