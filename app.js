const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
const ejs = require('ejs');
const Post = require('./models/Post');


const app = express();

app.use(express.static('public'));

//connect DB
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db'), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

//TEMPLATE ENGINE
app.set('view engine', 'ejs')

//MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//ROUTES
app.get("/", async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
})

app.get("/about", (req, res) => {
    res.render('about')
})
app.get("/post", (req, res) => {
    res.render('post')
})


app.get("/add_post", (req, res) => {
    res.render('add_post')
})

app.post("/add_post", async (req, res) => {
    await Post.create(req.body)
    res.redirect('/')
})


const port = 4000;

app.listen(port, () => {
    console.log(`Sunucumuz ${port} portunda calisiyor.`)
})