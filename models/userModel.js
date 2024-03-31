
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    user:{type:String, required:[true,"username required"]},
    email:{type:String,required:[true,"email required"],unique:[true,"email already exists in database"]},
    password:{type:"string",required:[true,"please add user password"]}
},{timestamps:true});


module.exports=mongoose.model("User",userSchema);
