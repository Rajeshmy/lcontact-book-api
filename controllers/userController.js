
const asyncHandler=require("express-async-handler");
const User = require('../models/userModel');
const encrypt=require("bcrypt");
const JWT = require("jsonwebtoken");

const register =asyncHandler(async(req,res)=>{
    
    const {user,email,password}=req.body;
    console.log("---1")
    if(!user||!email||!password){
        res.status(400);
        throw new Error('All fields are mandatory');
    };
    console.log("---2")
    const userex= await User.findOne({email});

    if(userex){
        res.status(400);
        throw new Error('user exists');
    }
    console.log("---3")
    const hashpassword= await encrypt.hash(password,10);
    console.log("---4")
    console.log(hashpassword);
    const user_ = await User.create({user,email,password:hashpassword});
    if(user_){
        console.log(user_)
        res.status(201).json({message:"user created",data:{user:user_.user,email:user_.email}});
    }
}); 

const login = asyncHandler(async(req,res)=>{

    const {email,password} = req.body;
    console.log("-1")
    if(!password || !email){
        res.status(400);
        throw new  Error("username or password is missing")
    }
    console.log("-2")
    let user = await User.findOne({email});
    console.log("-3",user);
    if(user && (await encrypt.compare(password,user.password))){
        console.log("-4")
        const accessToken = JWT.sign({
            user:{
                username:user.username,
                id:user.id,
                email:user.email
            }
        },
        process.env.SECRET_TOKEN,
        {expiresIn:"15m"});
        console.log("-5")
        res.status(200).json({accessToken});
    }else{
        res.status(404)
    }   throw new Error("wrong credentials")
}); 

//@access private
const current =asyncHandler(async(req,res)=>{

    res.status(200).json("current user")
}); 

module.exports ={register,login,current};