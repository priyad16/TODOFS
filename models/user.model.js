const mongoose=require('mongoose');
const userschema=mongoose.Schema({
    email:{
        type:String,
        required:true

    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});
const usermodel=mongoose.model("Userprofiles",userschema);
module.exports=usermodel;