import React, { useState } from 'react';

const PetDetailsModal = ({ pet, onClose }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  const handleAdopt = () => {
    setSuccessMessage("Request sent successfully. Wait for results.");
    setIsButtonDisabled(true);
    // You may want to add additional logic here for the adoption request
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{pet.name}</h2>
        <p>Species: {pet.species}</p>
        <p>Breed: {pet.breed}</p>
        <p>Age: {pet.age}</p>
        <p>Gender: {pet.gender}</p>
        <p>Health Status: {pet.healthStatus}</p>
        <p>Behavior: {pet.behavior}</p>
        <p>Description: {pet.description}</p>
        <button className="adopt-button" onClick={handleAdopt} disabled={isButtonDisabled}>Adopt</button> 
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default PetDetailsModal;
