const Class = require('../models/classModel');

// Get all classes
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('units').populate('students');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new class
const createClass = async (req, res) => {
  const { title, units, students } = req.body;
  try {
    const newClass = new Class({ title, units, students });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create class' });
  }
};

// Update class by ID
const updateClass = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedClass = await Class.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedClass) return res.status(404).json({ message: 'Class not found' });
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update class' });
  }
};

// Delete class by ID
const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    await Class.findByIdAndDelete(id);
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete class' });
  }
};

module.exports = {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
};
