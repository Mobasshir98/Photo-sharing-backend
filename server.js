require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const postinfo= require('./model')
const multer=require('multer')
const app=express();
const cors= require("cors")
mongoose.connect("mongodb+srv://mobasshir:atlas1234@cluster0.tw3by.mongodb.net/instaclone?retryWrites=true&w=majority")
app.use(express.json())
app.use(multer)
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.listen(process.env.PORT||3001,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("server is running")
    }
})

app.get("/", (req,res)=>{
    res.send("instaclone backend")
})
app.get("/posts", async (req,res)=>{
    try{
        const data = await postinfo.find({})
        res.status(200).send(data)
    }
    catch{
        res.status(400).send("an error occured while getting posts")
    }
} ) 
app.post("/post",async (req,res)=>{
    try{

        const {image,author,location,description}=req.body
        const register =  new postinfo({
            image,author,location,description,Date:new Date().toJSON().slice(0, 10),likes:Math.floor(Math.random()*200)
        })
        const registered= await register.save();
        if(registered){
            res.status(200).send(registered)
        }
    }
    catch{
        res.status(400).send("an error occured while posting")
    }
})