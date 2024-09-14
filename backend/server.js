const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Route imports
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const unitRoutes = require('./routes/unitRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const commentRoutes = require('./routes/commentRoutes');

dotenv.config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/comments', commentRoutes);

app.use((req, res, next) => {
  console.log(`Received request on: ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Virtual Classroom API is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
