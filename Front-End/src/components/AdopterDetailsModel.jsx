import React from 'react';

const AdopterDetailsModal = ({ adopter, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Adopter Details</h2>
        <p><strong>Name:</strong> {adopter.name}</p>
        <p><strong>Email:</strong> {adopter.emailAddress}</p>
        <p><strong>Phone:</strong> {adopter.phoneNumber}</p>
      </div>
    </div>
  );
};

export default AdopterDetailsModal;
