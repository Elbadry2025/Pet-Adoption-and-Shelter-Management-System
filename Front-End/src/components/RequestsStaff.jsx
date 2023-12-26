import React, { useState, useEffect } from 'react';
import PetDetailsModal from './PetDetailsModal'; 
import AdopterDetailsModal from './AdopterDetailsModel';
import './RequestsStaff.css'; 

const RequestsStaff = () => {
  const [requests, setRequests] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedAdopter, setSelectedAdopter] = useState(null);

  useEffect(() => {
    // Mock data
    const mockData = [
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
      // Add more mock objects as needed
    ];
    setRequests(mockData);
  }, []);

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
  };

  const handleAdopterClick = (adopter) => {
    setSelectedAdopter(adopter);
  };

  const handleStatusChange = (adoptionId, newStatus) => {
    setRequests(requests.map(request => 
      request.adoptionId === adoptionId ? { ...request, status: newStatus } : request
    ));
  };

  return (
    <div className="requests-staff">
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
                <select value={request.status} onChange={(e) => handleStatusChange(request.adoptionId, e.target.value)}>
                  <option value="reject">Reject</option>
                  <option value="accept">Accept</option>
                  <option value="pending">Pending</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPet && (
        <PetDetailsModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
        />
      )}
      {selectedAdopter && (
        <AdopterDetailsModal
          adopter={selectedAdopter}
          onClose={() => setSelectedAdopter(null)}
        />
      )}
    </div>
  );
};

export default RequestsStaff;
