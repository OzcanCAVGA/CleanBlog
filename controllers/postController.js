const Post = require('../models/Post')



// Tum Postlari getirme
exports.getAllPosts = async (req, res) => {
    const posts = await Post.find({}).sort('-dateCreate')
    res.render('index', {
        posts
    })
}

// Tek post getirme
exports.getPost = async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
}

// Post Olusturma
exports.createPost = async (req, res) => {
    await Post.create(req.body)
    res.redirect('/')
}

// Post duzenleme
exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });

        if (!updatedPost) {
            return res.status(404).send('Gönderi bulunamadı');
        }

        res.redirect(`/posts/${postId}`);


    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.redirect('/')

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}