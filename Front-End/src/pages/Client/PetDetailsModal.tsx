import React, { useState, useEffect } from 'react';
import { httpRequest } from '../../HttpProxy'; // Update the import path as necessary

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

const currentUserId = 1; // Replace with actual user ID

const PetDetailsModal: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [petsPerPage] = useState<number>(12);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await httpRequest('get', '/api/pets/get_all_pets');
        if (response.status === 200) {
          setPets(response.data);
        } else {
          throw new Error('Failed to fetch pets.');
        }
      } catch (err) {
        setError('An error occurred while fetching pets.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleAdopt = async (petId: number) => {
    const adoptionRequest = {
      petId: petId,
      userId: currentUserId,
      adoptionDate: new Date(),
      status: 'pending',
    };

    try {
      const response = await httpRequest('post', '/api/adoptions/create_adoption', adoptionRequest);
      if (response.status === 200) {
        alert('Adoption request sent successfully!');
      } else {
        alert('Failed to send adoption request.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred.');
    }
  };

  // Pagination logic
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  const totalPages = Math.ceil(pets.length / petsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const petsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap' as 'wrap',
  justifyContent: 'center',
  margin: '20px 0',
  backgroundColor: 'white', // Light shade of blue or green
};

const petCardStyle = {
  margin: '10px',
  border: '1px solid #ccc', // Adjusted to a lighter border color
  padding: '15px',
  borderRadius: '8px',
  backgroundColor: '#FFFFFF', // White background
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '250px',
  textAlign: 'center' as 'center',
};

const buttonStyle = {
  backgroundColor: '#4CAF50', // Green color for adoption button
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};

const titleStyle = {
  textAlign: 'center' as 'center',
  color: '#333',
  marginBottom: '20px',
  backgroundColor: 'white', // Similar to petsContainerStyle for coherence
};


  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 style={titleStyle}>Pet Adoption</h1>
      <div style={petsContainerStyle}>
        {currentPets.map(pet => (
          <div key={pet.petId} style={petCardStyle}>
            <h2>{pet.name}</h2>
          <p><strong>Species:</strong> {pet.species}</p>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Age:</strong> {pet.age}</p>
          <p><strong>Gender:</strong> {pet.gender}</p>
          <p><strong>Health Status:</strong> {pet.healthStatus}</p>
          <p><strong>Behavior:</strong> {pet.behavior}</p>
          <p><strong>Description:</strong> {pet.description}</p>
            <button style={buttonStyle} onClick={() => handleAdopt(pet.petId)}>Adopt</button>
          </div>
        ))}
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PetDetailsModal;
