const express = require('express');
const app = express();
const path = require("path")
const ejs = require('ejs');
app.use(express.static('public'))

//TEMPLATE ENGINE
app.set('view engine','ejs')

app.get("/",(req,res)=>{
    res.render('index')
})

app.get("/about",(req,res)=>{
    res.render('about')
})
app.get("/add_post",(req,res)=>{
    res.render('add_post')
})
app.get("/post",(req,res)=>{
    res.render('post')
})


const port = 4000;

app.listen(port,()=>{
    console.log(`Sunucumuz ${port} portunda calisiyor.`)
})