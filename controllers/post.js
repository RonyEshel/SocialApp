const Post = require('../models/post_model');

const getAllPosts = async (req, res) => {
    const filter = req.query.sender ? { sender: req.query.sender } : {};
    
    try {
        const posts = await Post.find(filter);
        res.send(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createPost = async (req, res) => {
    const post = new Post({
        message: req.body.message,
        sender: req.body.sender
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            res.send(post);
        } else {
            res.status(404).send("Post not found");
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
        );
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    getPostById, 
    updatePost
};