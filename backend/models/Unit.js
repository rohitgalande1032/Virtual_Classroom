const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Title of the Unit (e.g., "Mathematics")
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }] // Array of sessions linked to the unit and reference for multiple sessions
}, { timestamps: true });  // timestamps will add createdAt and updatedAt fields automatically

module.exports = mongoose.model('Unit', UnitSchema);
