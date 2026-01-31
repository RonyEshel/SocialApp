const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment');

router.get('/', CommentController.getAllComments);
router.post('/', CommentController.createComment);
router.delete('/:id', CommentController.deleteComment);
router.put('/:id', CommentController.updateComment); // הוספנו גם עדכון לפי הדרישות

module.exports = router;