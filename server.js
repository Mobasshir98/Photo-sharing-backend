const express = require('express');
const mongoose = require('mongoose');
const postinfo= require('./model')
const app=express();
const cors= require("cors")
mongoose.connect("mongodb://localhost/instaclone")
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.listen(5000,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("server is running")
    }
})
app.post("/post",async (req,res)=>{
    const {image,author,location,description}=req.body
    const register =  new postinfo({
        image,author,location,description,Date:new Date().toJSON().slice(0, 10),likes:Math.floor(Math.random()*200)
    })
    const registered= await register.save();
    if(registered){
        res.status(200).send("Post Uploaded Successfully")
    }
})
app.get("/", async (req,res)=>{
    const data = await postinfo.find({})
    res.status(200).send(data)
} ) 