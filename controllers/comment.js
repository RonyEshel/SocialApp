const Comment = require('../models/comment_model');

// קבלת כל התגובות (עם אופציה לסינון לפי פוסט)
const getAllComments = async (req, res) => {
    // אם נשלח postId בבקשה, נסנן לפי זה
    const filter = req.query.postId ? { postId: req.query.postId } : {};

    try {
        const comments = await Comment.find(filter);
        res.send(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// יצירת תגובה חדשה
const createComment = async (req, res) => {
    const comment = new Comment({
        message: req.body.message,
        sender: req.body.sender,
        postId: req.body.postId // חובה לקשר לפוסט
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// מחיקת תגובה
const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// עדכון תגובה
const updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getAllComments,
    createComment,
    deleteComment,
    updateComment
};