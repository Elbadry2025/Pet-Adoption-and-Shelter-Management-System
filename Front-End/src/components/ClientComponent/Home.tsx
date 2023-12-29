import React, { useState, useEffect } from 'react';
import './Home.css';
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

const Home: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  //APIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
  useEffect(() => {
    // Fetch pet data from the backend
    const fetchPets = async () => {
      try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch pet data');
        }
        const petData: Pet[] = await response.json();
        setPets(petData);
      } catch (error) {
        console.error('Error fetching pet data:', error);
        // Handle error state or alert the user
      }
    };

    fetchPets();
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
          <p><strong>Species: {pet.species}</strong></p>
          <p><strong>Breed: {pet.breed}</strong></p>
        </div>
      ))}
      {selectedPet && <PetDetailsModal pet={selectedPet} onClose={closeModal} />}
    </div>
  );
};

export default Home;
