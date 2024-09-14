const express = require('express');
const { getSessions, createSession, updateSession, deleteSession } = require('../controllers/sessionController');

const router = express.Router();

// Define CRUD operations for sessions
router.get('/', getSessions);  // Get all sessions
router.post('/', createSession);  // Create a new session
router.put('/:id', updateSession);  // Update session by ID
router.delete('/:id', deleteSession);  // Delete session by ID

module.exports = router;
