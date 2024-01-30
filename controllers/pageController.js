const Post = require('../models/Post');

//About sayfasina goturur
exports.getAboutPage = (req, res) => {
    res.render('about')
}

//Sayfa eklemeye goturur
exports.getAddPage = (req, res) => {
    res.render('add_post')
};

exports.getEditPage = async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    res.render('edit',
        { post: post });
};

