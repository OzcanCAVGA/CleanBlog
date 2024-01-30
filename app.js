const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
const ejs = require('ejs');
const methodOverride = require('method-override')
const Post = require('./models/Post');
const postControler = require('./controllers/postController')
const pageController = require('./controllers/pageController')
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
// app.use(fileUpload())
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))

//ROUTES
app.get("/", postControler.getAllPosts)
app.get("/posts/:id", postControler.getPost)
app.post("/add_post", postControler.createPost)
app.put('/posts/edit/:id',postControler.updatePost)
app.delete('/posts/:id',postControler.deletePost)

app.get("/about", pageController.getAboutPage)
app.get("/add_post", pageController.getAddPage)


app.get('/posts/edit/:id', pageController.getEditPage)



const port = 4000;

app.listen(port, () => {
    console.log(`Sunucumuz ${port} portunda calisiyor.`)
})