import React, { useState, useEffect } from 'react';
import { httpRequest } from '../../HttpProxy'; // Update the import path as necessary
import {getToken, getUserId} from '../../CurrentSession'
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import axios from 'axios';

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

export interface FilterPetsDto {
  name: string;
  species: string;
  breed: string;
  shelter_location: string;
  gender: string;
  behavior: string;
  age: number;
  house_trained: boolean;
  vaccinated: boolean;
  neutered: boolean;
}

const currentUserId = getUserId(); // Replace with actual user ID

const PetDetailsModal: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [petsPerPage] = useState<number>(12);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<FilterPetsDto>({
    name: '',
    species: '',
    breed: '',
    shelter_location: '',
    gender: '',
    behavior: '',
    age: 0,
    house_trained: false,
    vaccinated: false,
    neutered: false
  });
  const navigate = useNavigate();

  const goback = () => {
    navigate('/useradoptionstable')
  }

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFilterButtonClick = async() => {
    const pets = await getFilteredPets(filter);
    setPets(pets);
  }

  const getFilteredPets = async (filter: FilterPetsDto) => {
    let url = `http://localhost:8081/api/filter/Pet`;
    try {
      const response = await axios(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        data: filter
      });
      console.log(response.data);
      const pets: Pet[] = response.data;
      return pets;
    } catch (error) {
      console.log("Error:", error);
      const pets: Pet[] = [];
      return pets;
    }
  }

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

  const toggleFilterModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
      <h1 style={titleStyle}>Pet Adoption</h1>
      <button className="btn btn-primary" style={{ marginLeft: '30px' }} onClick={toggleFilterModal}>
        Search and Filter
      </button>
      {showModal && 
        <div>
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Filter Options</h5>
          <label>Pet Name:</label>
          <input type="text" name="name" className="form-control" value={filter.name} onChange={handleInputChange} />

          <label>Species:</label>
          <input type="text" name="species" className="form-control" value={filter.species} onChange={handleInputChange} />

          <label>Breed:</label>
          <input type="text" name="breed" className="form-control" value={filter.breed} onChange={handleInputChange} />

          <label>Shelter Location:</label>
          <input type="text" name="shelter_location" className="form-control" value={filter.shelter_location} onChange={handleInputChange} />

          <label>Gender:</label>
          <input type="text" name="gender" className="form-control" value={filter.gender} onChange={handleInputChange} />

          <label>Behavior:</label>
          <input type="text" name="behavior" className="form-control" value={filter.behavior} onChange={handleInputChange} />

          <label>Minimum Age:</label>
          <input type="number" name="age" className="form-control" value={filter.age} onChange={handleInputChange} />

          <div className="mb-3 mt-3">
            <label className="form-check-label" htmlFor="house_trained">
              House Trained
            </label>
            <input name="house_trained" className="form-check-input" type="checkbox" 
            checked={filter.house_trained} style={{ marginLeft: "10px", position: "relative", bottom: "4px" }} onChange={handleInputChange} />
          </div>

          <div className="mb-3 mt-3">
            <label className="form-check-label" htmlFor="vaccinated">
              Vaccinated
            </label>
            <input name="vaccinated" className="form-check-input" type="checkbox" 
            checked={filter.vaccinated} style={{ marginLeft: "10px", position: "relative", bottom: "4px" }} onChange={handleInputChange} />
          </div>

          <div className="mb-3 mt-3">
            <label className="form-check-label" htmlFor="neutered">
              Neutered
            </label>
            <input name="neutered" className="form-check-input" type="checkbox" 
            checked={filter.neutered} style={{ marginLeft: "10px", position: "relative", bottom: "4px" }} onChange={handleInputChange} />
          </div>

          <div className="d-flex justify-content-end mt-2">
            <Button variant="primary" onClick={() => handleFilterButtonClick()} style={{ position: 'relative', right: '50%', width: '100px' }}>
              Filter
            </Button>
        </div>
      </div>
      }
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
      <button className='btn btn-primary' onClick={goback} style={{ margin: '20px' }}>Back to Adoptions</button>
    </div>
  );
};

export default PetDetailsModal;
