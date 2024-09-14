import React, { useState, useEffect } from 'react';
import { getAllClasses } from '../services/api';
import { Link } from 'react-router-dom';
import ClassCard from '../components/ClassCard';

const Home = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await getAllClasses();
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div>
      <h1>Available Classes</h1>
      <div>
        {classes.map((classItem) => (
          <Link to={`/class/${classItem._id}`} key={classItem._id}>
            <ClassCard title={classItem.title} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
