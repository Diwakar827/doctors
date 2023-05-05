const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const auth=require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    console.log("request came");
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const userexists = await userModel.findOne({ email: email });

    if (userexists) {
      console.log("user exists");
      return res
        .status(200)
        .json({ message: "user already exists", success: false });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      return res
        .status(200)
        .json({ message: "user successfully registered", success: true });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "something went wrong", error: err, success: false });
  }
  next();
});

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user doesnot exists", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res
        .status(200)
        .send({ message: "Login Succesful", success: true, token : token});
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error Logging in", success: false, data: error });
  }
});

router.post("/getuserdata", auth,async (req, res) => {
 
  console.log("request came");
  try {
    const user=await userModel.findOne({_id:req.body.userId});

    if(!user)
    {
       return res.status(200).send({
           message:"User doesnot exists",
           success:false
       });


    }
    else
    {
       return res.status(200).send({
           data:{
           name:user.name,
           email:user.email,
           isDoctor:user.isDoctor,
            isAdmin:user.isAdmin,
      watchedNotifications:user.watchedNotifications,
      seenNotifications:user.seenNotifications,
      unseenNotifications:user.unseenNotifications,
    },
           success:true
       });
    }
} catch (error) {
   
}
})

module.exports = router;
