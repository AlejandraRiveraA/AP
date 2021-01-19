const postCtrl = {};
const Post = require('../models/Post');

postCtrl.getPosts = async (req, res) => {

    const posts = await Post.find().sort({createdAt: -1});
    res.json(posts);

};


postCtrl.createPost = async (req, res) => {
    console.log(req.body);
    const { title,
        description } = req.body;
    const newPost = new Post({

            title,
            description

    });

    await newPost.save();
    res.json({message: "Post Creado"});

};

postCtrl.getPost = async (req, res) => {

    const post = await Post.findById(req.params.id);
    res.json(post);

};

postCtrl.updatePost = async (req, res) => {

    const { title,
        description} = req.body;

    await Post.findOneAndUpdate({_id: req.params.id}, {
        
        title,
        description
    });

        res.json({message : "Post Actualizado"});
};

postCtrl.deletePost = async (req, res) => {

        await Post.findByIdAndDelete(req.params.id);
        res.json({message : "Post Eliminada"});

};

module.exports = postCtrl;