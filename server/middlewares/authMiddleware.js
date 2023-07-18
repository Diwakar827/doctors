const jwt=require('jsonwebtoken');

module.exports=async(req,res,next)=>{
  
      try {
            
        let str=req.headers["authorization"];
       
        if (typeof str === 'string') 
       {const token=str.split(" ")[1];
        // console.log(token);

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{

         if(err)
         {
            return res.status(401).send({
                message:"auth failed",
                success:false
            });
         }
         else{
            req.body.userId=decoded.id;
            next();
         }


    
    })
  } 

}
catch(error)
{
    console.log(error);
    return res.status(401).send({
        message:"auth failed",
        success:false
    });
}



}