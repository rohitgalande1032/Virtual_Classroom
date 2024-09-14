const Session = require('../models/Session');

// Get all sessions
const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate('comments');
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new session
const createSession = async (req, res) => {
  const { title, lectures, comments } = req.body;
  try {
    const newSession = new Session({ title, lectures, comments });
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create session' });
  }
};

// Update session by ID
const updateSession = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSession = await Session.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSession) return res.status(404).json({ message: 'Session not found' });
    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update session' });
  }
};

// Delete session by ID
const deleteSession = async (req, res) => {
  const { id } = req.params;
  try {
    await Session.findByIdAndDelete(id);
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete session' });
  }
};

module.exports = {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
};
