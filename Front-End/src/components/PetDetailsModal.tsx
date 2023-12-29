import React, { useState } from 'react';

interface Pet {
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  healthStatus: string;
  behavior: string;
  description: string;
}

interface PetDetailsModalProps {
  pet: Pet;
  onClose: () => void;
}

const PetDetailsModal: React.FC<PetDetailsModalProps> = ({ pet, onClose }) => {
  const [successMessage, setSuccessMessage] = useState<string>(''); 
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const handleAdopt = () => {
    setSuccessMessage("Request sent successfully. Wait for results.");
    setIsButtonDisabled(true);
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
