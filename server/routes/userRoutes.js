const express = require("express");

const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");
const router = express.Router();

router.post("/register", async (req, res,next) => {
  try{
    
    console.log("request came");
    const name=req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const userexists = await userModel.findOne({email:email});

  if (userexists)
   {
    console.log("user exists");
    return  res.status(200).json({ message: "user already exists", success: false });
  } 
  else 
  {
     
    const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "user successfully registered", success: true });
   }
}
    catch(err)
    {
        console.log(err);
       return res.status(400).json({ message: "something went wrong",error:err, success: false});
    }
    next();
});


module.exports=router;