
const express=require('express');
const mongoose=require("mongoose");
const path=require('path');
require('dotenv').config();
const app=express();
const userrouter=require('./routes/userRoutes');
const adminrouter=require("./routes/adminRoute");
const doctorRouter=require("./routes/doctorRoutes");
const cors=require('cors');

app.use(cors({
  origin:["https://doctors-client-xi.vercel.app/"],
  methods:["POST","GET"],
  credentials:true
}))

app.use(express.json());
app.use(cors());
app.use('/api/userchecking',userrouter);
app.use("/api/admin", adminrouter);
app.use("/api/doctor", doctorRouter);


app.get("/",(req,res)=>{
      res.send("Welcome to the server");
})

const port=process.env.PORT || 5000;

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

/*
    if(process.env.NODE_ENV === 'production')
    {
    
        app.use('/', express.static('../client/build'));

        app.get('*',(req,res)=>{
          res.sendFile(path.resolve(__dirname,'client/build/index.html'));
        });

    }

    */

    app.listen(port,(req,res)=>{
        console.log("server started at port 5000")
    });



