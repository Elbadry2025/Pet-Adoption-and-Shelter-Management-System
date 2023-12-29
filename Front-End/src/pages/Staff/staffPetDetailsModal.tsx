import React from 'react';

// Hard-coded pet data inside the component
const petData = {
  name: 'Buddy',
  species: 'Dog',
  breed: 'Golden Retriever',
  age: 3,
  gender: 'Male',
  healthStatus: 'Healthy',
  behavior: 'Friendly',
  description: 'Loves to play fetch and swim in the lake.'
};

const StaffPetDetailsModal: React.FC = () => {
  // Function to close the modal (you can customize this as needed)
  const onClose = () => {
    console.log('Modal closed');
    // Add logic to close the modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close" onClick={onClose}>&times;</button>
        <h2>{petData.name}</h2>
        <p><strong>Species:</strong> {petData.species}</p>
        <p><strong>Breed:</strong> {petData.breed}</p>
        <p><strong>Age:</strong> {petData.age}</p>
        <p><strong>Gender:</strong> {petData.gender}</p>
        <p><strong>Health Status:</strong> {petData.healthStatus}</p>
        <p><strong>Behavior:</strong> {petData.behavior}</p>
        <p><strong>Description:</strong> {petData.description}</p>
      </div>
    </div>
  );
};
  
export default StaffPetDetailsModal;
