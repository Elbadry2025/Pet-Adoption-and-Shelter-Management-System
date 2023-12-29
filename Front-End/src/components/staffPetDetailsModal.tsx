import React from 'react';

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

interface StaffPetDetailsModalProps {
  pet: Pet;
  onClose: () => void;
}

const StaffPetDetailsModal: React.FC<StaffPetDetailsModalProps> = ({ pet, onClose }) => {
    return (
      <div className="smodal">
        <div className="smodal-content">
          <button className="close" onClick={onClose} aria-label="Close">&times;</button>
          <h2>{pet.name}</h2>
          <p><strong>Species:</strong> {pet.species}</p>
          <p> <strong>Breed:</strong>{pet.breed}</p>
          <p><strong>Age:</strong> {pet.age}</p>
          <p><strong>Gender:</strong> {pet.gender}</p>
          <p><strong>Health Status:</strong> {pet.healthStatus}</p>
          <p><strong>Behavior:</strong> {pet.behavior}</p>
          <p><strong>Description:</strong> {pet.description}</p>
        </div>
      </div>
    );
  };
  
export default StaffPetDetailsModal;
