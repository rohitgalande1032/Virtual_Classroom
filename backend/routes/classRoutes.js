const express = require('express');
const router = express.Router();
const {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass
} = require('../controllers/classController');

// Create a new class
router.post('/', createClass);

// Get all classes
router.get('/', getClasses);

// Get a class by ID
//router.get('/:id', getClassById);

// Update a class
router.put('/:id', updateClass);

// Delete a class
router.delete('/:id', deleteClass);

module.exports = router;
