import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClassDetails } from '../services/api';
import Comment from '../components/Comment';

const ClassDetails = () => {
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await getClassDetails(id);
        setClassDetails(response.data);
      } catch (error) {
        console.error('Error fetching class details:', error);
      }
    };
    fetchClassDetails();
  }, [id]);

  return (
    <div>
      {classDetails ? (
        <>
          <h1>{classDetails.title}</h1>
          <div>
            <h2>Sessions</h2>
            <ul>
              {classDetails.units.map((unit) => (
                <li key={unit._id}>
                  <h3>{unit.title}</h3>
                  {unit.sessions.map((session) => (
                    <p key={session._id}>{session.title}</p>
                  ))}
                </li>
              ))}
            </ul>
            <Comment sessionId={id} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClassDetails;
