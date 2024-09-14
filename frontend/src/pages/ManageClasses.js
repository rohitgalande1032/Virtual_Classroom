import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClassForm from './ClassForm';
import ClassList from '../components/ClassList';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);

  useEffect(() => {
    axios.get('/api/classes').then(response => {
      setClasses(response.data);
    });
  }, []);

  const handleSave = () => {
    axios.get('/api/classes').then(response => {
      setClasses(response.data);
      setSelectedClassId(null);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/classes/${id}`).then(() => {
      setClasses(classes.filter(cls => cls._id !== id));
    });
  };

  return (
    <div>
      <h1>Manage Classes</h1>
      <ClassForm classId={selectedClassId} onSave={handleSave} />
      <ClassList classes={classes} onDelete={handleDelete} />
    </div>
  );
};

export default ManageClasses;
