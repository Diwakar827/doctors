const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const auth=require('../middlewares/authMiddleware');
const doctorModel = require("../models/doctorModel");
const   Appointment=require("../models/appointmentModel");
const router = express.Router();
const moment=require('moment');
router.post("/register", async (req, res, next) => {
  try {
  //  console.log("request came");
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
 
 // console.log("request came");
  
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
  console.log(error);
   
}
})


router.post("/applydoctor", auth, async (req, res) => {
   
  console.log("someone applied to doctor");
  try {

    const newdoctor = new doctorModel({ ...req.body, status: "pending" });
    
    await newdoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request",
      message: newdoctor.firstName +" "+newdoctor.lastName+" "+ "has applied for a doctor account",
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },
      onClickPath: "/admin/doctorslist",
    });
    await userModel.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {

    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

router.post("/markunseennotifications", auth, async (req, res) => {
   
  console.log("someone doing chedchad with notification");
  try {

   
    const user = await userModel.findOne({_id:req.body.userId });

    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unseenNotifications);
    user.unseenNotifications=[];
  
    const updateUser=await user.save();
    updateUser.password=undefined;
    res.status(200).send({
      success: true,
      message: "All notifications marked as seen",
      data:updateUser,
    });
  } catch (error) {

    console.log(error);
    res.status(500).send({
      message: "Error deleting notifications",
      success: false,
      error,
    });
  }
});


router.post("/deleteallnotifications", auth, async (req, res) => {
   
  //console.log("someone applied to doctor");
  try {

   
    const user = await userModel.findOne({_id:req.body.userId });

  
    user.seenNotifications=[];
    user.unseenNotifications=[];
   
    const updateUser=await user.save();
    updateUser.password=undefined;
    res.status(200).send({
      success: true,
      message: "All notifications deleted",
      data:updateUser,
    });
  } catch (error) {

    console.log(error);
    res.status(500).send({
      message: "Error deleting notifications",
      success: false,
      error,
    });
  }
});



router.get("/get-all-approved-doctors", auth, async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});


router.post("/book-appointment", auth, async (req, res) => {
  try {
    req.body.status = "pending";
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    //pushing notification to doctor based on his userid
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${req.body.userInfo.name}`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
});

router.post("/check-booking-avilability", auth, async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await Appointment.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not available",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointments available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error,
      success: false,
      error,
    });
  }
});

router.get("/get-appointments-by-user-id", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.body.userId });
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
});

module.exports = router;
