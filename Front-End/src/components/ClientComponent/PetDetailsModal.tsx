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
    //API choose new pet
    setSuccessMessage("Request sent successfully. Wait for results.");
    setIsButtonDisabled(true);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{pet.name}</h2>
        <p><strong>Species:</strong> {pet.species}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Age:</strong> {pet.age}</p>
        <p><strong>Gender:</strong> {pet.gender}</p>
        <p><strong>Health Status:</strong> {pet.healthStatus}</p>
        <p><strong>Behavior:</strong> {pet.behavior}</p>
        <p><strong>Description:</strong> {pet.description}</p>
        <button className="adopt-button" onClick={handleAdopt} disabled={isButtonDisabled}>Adopt</button> 
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default PetDetailsModal;
