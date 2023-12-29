import React, { useState, useEffect } from 'react';
import './PetsComponent.css';
import PetDetailsModal from './PetDetailsModal'; 


interface Pet {
  petId: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  healthStatus: string;
  behavior: string;
  description: string;
  shelterId: number;
}

const PetsComponent: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  useEffect(() => {
    setPets([
      {
        petId: 1,
        name: "Max",
        species: "Dog",
        breed: "Labrador",
        age: 3,
        gender: "Male",
        healthStatus: "Healthy",
        behavior: "Friendly",
        description: "Loves playing fetch",
        shelterId: 101
      },
      {
        petId: 2,
        name: "Bella",
        species: "Cat",
        breed: "Persian",
        age: 2,
        gender: "Female",
        healthStatus: "Healthy",
        behavior: "Playful",
        description: "Enjoys lounging in the sun",
        shelterId: 102
      },
      {
        petId: 3,
        name: "Charlie",
        species: "Dog",
        breed: "Golden Retriever",
        age: 4,
        gender: "Male",
        healthStatus: "Healthy",
        behavior: "Energetic",
        description: "Loves long walks and playing fetch",
        shelterId: 103
      },
    ]);
  }, []);

  const handlePetClick = (pet: Pet) => {
    setSelectedPet(pet);
  };

  const closeModal = () => {
    setSelectedPet(null);
  };

  return (
    <div className="pets-container">
      {pets.map(pet => (
        <div key={pet.petId} className="pet-sticky-note" onClick={() => handlePetClick(pet)}>
          <h2>{pet.name}</h2>
          <p>Species: {pet.species}</p>
          <p>Breed: {pet.breed}</p>
        </div>
      ))}
      {selectedPet && <PetDetailsModal pet={selectedPet} onClose={closeModal} />}
    </div>
  );
};

export default PetsComponent;
