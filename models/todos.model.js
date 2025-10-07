const mongoose=require('mongoose');
const todoschema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
}, { timestamps: true });
const Todomodel=mongoose.model("Todo",todoschema);
module.exports=Todomodel;

