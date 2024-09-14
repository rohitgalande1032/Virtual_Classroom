import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClassCard from '../components/ClassCard';
import './Home.css';

const Home = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/api/classes');
        console.log('Fetched classes:', response.data); // Ensure data is correct
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
  
    fetchClasses();
  }, []);
  

  return (
    <div className="home">
      <h1 className="home-title">Available Classes</h1>
      <div className="class-card-container">
        {classes.length > 0 ? (
          classes.map((classData) => (
            <ClassCard
              key={classData._id}
              title={classData.title}
              description={classData.description}
            />
          ))
        ) : (
          <p>No classes available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
