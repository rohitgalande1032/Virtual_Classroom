const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Title of the session (e.g., "Chapter 1: Introduction")
  lectures: [{ type: String }],  // Array of lecture URLs or descriptions (you can modify this based on your structure)
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]  // Comments associated with the session/lecture
}, { timestamps: true });

module.exports = mongoose.model('Session', SessionSchema);
