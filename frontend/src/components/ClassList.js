import React from 'react';
import { Link } from 'react-router-dom';

const ClassList = ({ classes, onDelete }) => {
  return (
    <div>
      <h2>Classes</h2>
      <ul>
        {classes.map(cls => (
          <li key={cls._id}>
            <Link to={`/classes/${cls._id}`}>{cls.title}</Link>
            <button onClick={() => onDelete(cls._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
