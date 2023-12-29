import React, { useState, useEffect } from 'react';
import StaffPetDetailsModal from './staffPetDetailsModal';
import AdopterDetailsModal from './AdopterDetailsModal'; 
import './CheckAdoptionApplications.css'; 

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
}

interface Adopter {
  userId: number;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  passwordHash: string;
}

interface AdoptionRequest {
  adoptionId: number;
  pet: Pet;
  adopter: Adopter;
  adoptionDate: string;
  status: 'reject' | 'accept' | 'pending';
}

const CheckAdoptionApplications: React.FC = () => {
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedAdopter, setSelectedAdopter] = useState<Adopter | null>(null);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const mockData: AdoptionRequest[] = [
      {
        adoptionId: 1,
        pet: {
          petId: 101,
          name: 'Max',
          species: 'Dog',
          breed: 'Labrador',
          age: 3,
          gender: 'Male',
          healthStatus: 'Healthy',
          behavior: 'Friendly',
          description: 'Loves playing fetch'
        },
        adopter: {
          userId: 201,
          name: 'John Doe',
          emailAddress: 'john.doe@example.com',
          phoneNumber: '123-456-7890',
          passwordHash: 'hashedpassword123'
        },
        adoptionDate: '2023-01-01',
        status: 'pending'
      },
      {
        adoptionId: 2,
        pet: {
          petId: 102,
          name: 'Bella',
          species: 'Cat',
          breed: 'Persian',
          age: 2,
          gender: 'Female',
          healthStatus: 'Healthy',
          behavior: 'Calm',
          description: 'Enjoys napping in sunny spots'
        },
        adopter: {
          userId: 202,
          name: 'Alice Johnson',
          emailAddress: 'alice.johnson@example.com',
          phoneNumber: '987-654-3210',
          passwordHash: 'anotherhashedpassword456'
        },
        adoptionDate: '2023-02-15',
        status: 'accept'
      }
    ];
    setRequests(mockData);
  }, []);


  const handleStatusChange = (adoptionId: number, newStatus: string) => {
    if (newStatus === 'reject' || newStatus === 'accept' || newStatus === 'pending') {
      setRequests(requests.map(request => 
        request.adoptionId === adoptionId ? { ...request, status: newStatus as 'reject' | 'accept' | 'pending' } : request
      ));
    }
  };

  const handlePetClick = (pet: Pet) => setSelectedPet(pet);

  const handleAdopterClick = (adopter: Adopter) => setSelectedAdopter(adopter);
  
  const closeModal = () => {
    setSelectedPet(null);
    setSelectedAdopter(null);
  };

  const handleSubmit = async () => {
    try {
      // Here you would replace with your API call
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requests),
      });

      if (response.ok) {
        setUpdateMessage('Requests submitted successfully!');
        setTimeout(() => setUpdateMessage(''), 3000);
      } else {
        setUpdateMessage('Failed to submit requests. Please try again.');
        setTimeout(() => setUpdateMessage(''), 3000);
      }
    } catch (error) {
      setUpdateMessage('An error occurred. Please try again.');
      setTimeout(() => setUpdateMessage(''), 3000);
    }
  };

  return (
    <div className="requests-staff">
      <button className="submit-button" onClick={handleSubmit}>Submit Requests</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Pet</th>
            <th>Adopter</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.adoptionId}>
              <td>{request.adoptionId}</td>
              <td onClick={() => handlePetClick(request.pet)} style={{ cursor: 'pointer' }}>
                {request.pet.name}
              </td>
              <td onClick={() => handleAdopterClick(request.adopter)} style={{ cursor: 'pointer' }}>
                {request.adopter.name}
              </td>
              <td>{new Date(request.adoptionDate).toLocaleDateString()}</td>
              <td>
                <select 
                  value={request.status} 
                  onChange={(e) => handleStatusChange(request.adoptionId, e.target.value)}
                >
                  <option value="reject">Reject</option>
                  <option value="accept">Accept</option>
                  <option value="pending">Pending</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {updateMessage && <div className="notification">{updateMessage}</div>}
      {selectedPet && <StaffPetDetailsModal pet={selectedPet} onClose={closeModal} />}
      {selectedAdopter && <AdopterDetailsModal adopter={selectedAdopter} onClose={closeModal} />}  
    </div>
  );
};

export default CheckAdoptionApplications;
