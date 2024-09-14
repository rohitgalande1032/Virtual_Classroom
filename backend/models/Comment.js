const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the user who made the comment
  content: { type: String, required: true },  // The content of the comment
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],  // Nested replies (if any)
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true }  // Session the comment is related to
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
