const express = require('express');
const { getComments, createComment, updateComment, deleteComment, replyToComment } = require('../controllers/commentController');

const router = express.Router();

// Define CRUD operations for comments
router.get('/', getComments);  // Get all comments
router.post('/', createComment);  // Create a new comment
router.put('/:id', updateComment);  // Update comment by ID
router.delete('/:id', deleteComment);  // Delete comment by ID

// Nested comment reply
router.post('/:id/reply', replyToComment);  // Reply to a comment

module.exports = router;
