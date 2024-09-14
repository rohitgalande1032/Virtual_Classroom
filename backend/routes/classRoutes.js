// backend/routes/classRoutes.js
const express = require('express');
const router = express.Router();
const ClassController = require('../controllers/classController');

// Route to create a class
router.post('/', ClassController.createClass);

// Route to get all classes
router.get('/', ClassController.getAllClasses);

// Route to update a class
router.put('/:id', ClassController.updateClass);

// Route to delete a class
router.delete('/:id', ClassController.deleteClass);

module.exports = router;
