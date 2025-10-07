const express=require('express');
const app=express();
const mongoose=require('mongoose');
const user=require('./models/user.model');
const todo=require('./models/todos.model');
const bcrypt=require('bcrypt');
const {z, success}=require('zod');
const jwt=require('jsonwebtoken');
const JWT_SECRET="secret";
const emailschema=z.string().email().min(3).max(15);
const passwordschema=z.string().min(8);
const cors = require('cors');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

app.use(cors())

mongoose.connect(MONGO_URI)
.then(()=>console.log("Connected to DB"))
.catch((err)=>console.log("error connecting",err));

app.use(express.json());
app.listen(5000,()=>{
    console.log("server started on port 5000");
});

async function checkUserExists(req,res,next){
    const email=req.body.email;
    const userresult=await user.findOne({email:email});
    if(userresult){
        return res.json({message:"User already exists",success:false});

    }
    next();

}
app.post('/register',checkUserExists,async(req,res)=>{
    try{
    const{email,username,password}=req.body;

    const e=emailschema.safeParse(email);
    const p=passwordschema.safeParse(password);

    if(!e.success||!p.success){
        return res.json({message:"invalid email or password format",success:false});
    }
    const hashedpassword=await bcrypt.hash(password,10);
    const newuser=new user({
        username:username,
        password:hashedpassword,
        email:email
    });
    await newuser.save();
    res.json({message:"User registered successfully",success:true});
    }
    catch(err){
        console.log(err);
    }


});

app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const userresult=await user.findOne({email:email});
    if(!userresult)
        return res.json({message:"User not found",success:false});
    const validpass=await bcrypt.compare(password,userresult.password);
    if(validpass){
            const token=jwt.sign({username:userresult.username,email:userresult.email},JWT_SECRET);
            res.json({message:"login sucess",token,success:true});
        }
    else
            res.json({message:"invalid credentials",success:false});
    });

app.get('/profiles', async(req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ message: "login to continue" }); 
    }

    let vuser;
    try {
        vuser = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.json({message:"invalid token"});
    }

    const prof = await user.findOne({username:vuser.username});
    // console.log(prof);
    res.json({
        message: "Verified user",
        profile: {
            uname: prof.username,
            email: prof.email
        }
    });
});

app.post('/createtodo',async(req,res)=>{
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ message: "login to continue" }); 
    }

    let vuser;
    try {
        vuser = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.json({message:"invalid token"});
    }
    const {title}=req.body;
    const email=vuser.email;
    const seluser=await user.findOne({email:email});
    const id=seluser._id;
    const newtodo=new todo({title:title,userId:id});
    newtodo.save();
    res.json({message:"todo added"});

    

    

});
app.get('/gettodos',async(req,res)=>{
     const token = req.headers.authorization;
    if (!token) {
        return res.json({ message: "login to continue" }); 
    }

    let vuser;
    try {
        vuser = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.send("invalid token");
    }
    const email=vuser.email;
    const seluser=await user.findOne({email:email});
    const id=seluser._id; 
    const todos = await todo.find(
    { userId: id },             // filter
    { title: 1, isCompleted: 1, _id: 0 } // projection
    );

    res.json(todos);

});






