const Comment = require('../models/Comment');

// Get all comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user').populate('replies');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new comment
const createComment = async (req, res) => {
  const { user, content, session } = req.body;
  try {
    const newComment = new Comment({ user, content, session });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment' });
  }
};

// Update comment by ID
const updateComment = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update comment' });
  }
};

// Delete comment by ID
const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment' });
  }
};

// Reply to a comment (nested comments)
const replyToComment = async (req, res) => {
  const { id } = req.params;
  const { user, content } = req.body;
  try {
    const parentComment = await Comment.findById(id);
    if (!parentComment) return res.status(404).json({ message: 'Parent comment not found' });

    const reply = new Comment({ user, content });
    await reply.save();

    parentComment.replies.push(reply._id);
    await parentComment.save();

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: 'Failed to reply to comment' });
  }
};

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  replyToComment,
};
