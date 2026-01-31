const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post');

router.get('/', PostController.getAllPosts); 
router.post('/', PostController.createPost); 
router.get('/:id', PostController.getPostById);
router.put('/:id', PostController.updatePost);

module.exports = router;