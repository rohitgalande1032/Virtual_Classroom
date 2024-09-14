// src/app.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ClassDetails from './pages/ClassDetails';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ManageClasses from './pages/ManageClasses';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/class/:id" element={<ClassDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage-classes" element={<ManageClasses />} />
      </Routes>
    </Router>
  );
}

export default App;
