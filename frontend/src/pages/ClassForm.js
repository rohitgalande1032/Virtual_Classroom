import React, { useState } from 'react';
import axios from 'axios';
import './ClassForm.css';

const ClassForm = () => {
  const [classData, setClassData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData({ ...classData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/classes', classData);
      // Handle successful submission (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <div className="class-form-container">
      <h1 className="class-form-title">Create New Class</h1>
      <form onSubmit={handleSubmit}>
        <div className="class-form-group">
          <label htmlFor="title">Class Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={classData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="class-form-group">
          <label htmlFor="description">Class Description</label>
          <textarea
            id="description"
            name="description"
            value={classData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="class-form-button">
          Create Class
        </button>
      </form>
    </div>
  );
};

export default ClassForm;
