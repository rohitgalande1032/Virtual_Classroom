import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassForm = ({ classId, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (classId) {
      // Fetch class data if editing
      axios.get(`/api/classes/${classId}`).then(response => {
        setTitle(response.data.title);
        setDescription(response.data.description);
      });
    }
  }, [classId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const classData = { title, description };
    console.log(title + "abc")
    axios.post('/api/classes', classData)  // Ensure this matches the backend route
        .then(response => {
            console.log('Class created:', response.data);
        })
        .catch(error => {
            console.error('Error creating class:', error);
        });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Class Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Class Description"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ClassForm;
