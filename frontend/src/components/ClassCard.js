import React from 'react';
import './ClassCard.css'; // Ensure correct path

const ClassCard = ({ title, description }) => {
  return (
    <div className="class-card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ClassCard;
