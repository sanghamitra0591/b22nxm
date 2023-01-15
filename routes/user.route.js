const express= require("express");

const userRouter= express.Router();


const {UserModel} = require("../models/User.model");

const jwt= require("jsonwebtoken");

const bcrypt= require("bcrypt");



userRouter.post("/register", async (req, res)=>{
    const {email, pass, name, age}= req.body;
    try{
        bcrypt.hash(pass, 5, async(err, secure_password)=> {
            if(err){
                console.log(err);
            }else{
                const user= new UserModel({email, pass:secure_password, name, age});
                await user.save();
                res.send("Registered");
            }
        });
    }catch (error){
        res.send("Error in registering the user")
        console.log(error)
    }
})

userRouter.post("/login", async(req, res)=>{
    const {email, pass}= req.body;
    try{
        const user= await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(pass, user[0].pass, function(err, result) {
                if(result){
                    var token= jwt.sign({userID: user[0]._id}, process.env.key);
                    res.send({"msg" : "Login Successful", "token" : token});
                }else{
                    res.send("Wrong credentials");
                }
            });
        }else{
            res.send("Wrong credentials");
        }
    }catch (error){
        res.send("Something went wrong")
        console.log(error);
    }
})




module.exports= {
    userRouter
}