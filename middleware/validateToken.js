
const JWT = require("jsonwebtoken");
const asyncHandler=require("express-async-handler");


const validateToken=asyncHandler(async(req,res,next)=>{
  console.log("1")
    const Token = req.headers.authorization||req.headers.Authorization;
    console.log("2")
    if(!Token){
      res.status(401);
      throw new Error("Invalid Token");
    }
    
    if(Token.startsWith("Bearer")){
        const token = Token.split(" ")[1];

        JWT.verify(token,process.env.SECRET_TOKEN,(err,decodedinfo)=>{
          if(err){
            res.status(401);
            throw new Error("user unauthorised");
          }
          req.user=decodedinfo.user;
          next();
        });
    }else{
      res.status(401);
      throw new Error("Invalid Token");
    };

});

module.exports=validateToken;
