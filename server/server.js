
const express=require('express');
const mongoose=require("mongoose");
require('dotenv').config();
const app=express();


mongoose.connect(process.env.MONGO_URL, { 
  useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to database MONGO CONNECTION OPEN!!!")
    }
    )
    .catch((err) => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!");
        console.log(err)
    });

    app.listen(5000,(req,res)=>{
        console.log("server started at port 5000")
    });



