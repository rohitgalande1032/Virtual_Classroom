const Unit = require('../models/Unit');

const getUnits = async (req, res) => {
  try {
    const units = await Unit.find().populate('sessions');
    res.json(units);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createUnit = async (req, res) => {
  const { title, sessions } = req.body;
  try {
    const newUnit = new Unit({ title, sessions });
    await newUnit.save();
    res.status(201).json(newUnit);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create unit' });
  }
};

const updateUnit = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUnit = await Unit.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUnit) return res.status(404).json({ message: 'Unit not found' });
    res.json(updatedUnit);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update unit' });
  }
};

const deleteUnit = async (req, res) => {
  const { id } = req.params;
  try {
    await Unit.findByIdAndDelete(id);
    res.json({ message: 'Unit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete unit' });
  }
};

module.exports = {
  getUnits,
  createUnit,
  updateUnit,
  deleteUnit,
};