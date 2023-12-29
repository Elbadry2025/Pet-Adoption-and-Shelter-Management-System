import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import "./PetManagement.css"

interface PetProfile {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  healthStatus: string;
  behavior: string;
  description: string;
  imageUrl: string;
}

const PetManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetProfile | null>(null);
  const [form, setForm] = useState<PetProfile>({
    id: -1, // Temporary ID for new pets
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: 'Male',
    healthStatus: '',
    behavior: '',
    description: '',
    imageUrl: '',
  });
  const handleCardClick = (pet: PetProfile) => {
    setSelectedPet(pet);
    setShowDetails(true);
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleEdit = (pet: PetProfile) => {
    setShowForm(true);
    setIsEditMode(true);
    setForm(pet);
  };

  const handleDelete = (petId: number) => {
    setPets(pets.filter(pet => pet.id !== petId));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditMode) {
      setPets(pets.map(pet => (pet.id === form.id ? form : pet)));
    } else {
      const newId = pets.length > 0 ? pets[pets.length - 1].id + 1 : 1;
      const newPet = { ...form, id: newId }; // Generate a new ID for new pets
      setPets([...pets, newPet]);
    }
    setShowForm(false);
    setIsEditMode(false);
    setForm({
      id: -1,
      name: '',
      species: '',
      breed: '',
      age: '',
      gender: 'Male',
      healthStatus: '',
      behavior: '',
      description: '',
      imageUrl: '',
    });
    setIsEditMode(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setSelectedImage(img);
  
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (loadEvent.target) {
          setForm({ ...form, imageUrl: loadEvent.target.result as string });
        }
      };
      reader.readAsDataURL(img);
    }
  };
  
  return (
    <>
      <Button variant="primary" onClick={() => setShowForm(true)}>Add Pet</Button>
  
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit Pet' : 'Add Pet'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter pet name" name="name" value={form.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Species</Form.Label>
              <Form.Control type="text" placeholder="Enter species" name="species" value={form.species} onChange={handleChange} />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Breed</Form.Label>
              <Form.Control type="text" placeholder="Enter breed" name="breed" value={form.breed} onChange={handleChange} />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" placeholder="Enter age" name="age" value={form.age} onChange={handleChange} />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={form.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Health Status</Form.Label>
              <Form.Control type="text" placeholder="Enter health status" name="healthStatus" value={form.healthStatus} onChange={handleChange} />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Behavior</Form.Label>
              <Form.Control type="text" placeholder="Enter behavior" name="behavior" value={form.behavior} onChange={handleChange} />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={form.description} onChange={handleChange} />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
  
            <Button variant="success" type="submit" style={{marginRight: "15px"}}>Confirm</Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          </Form>
        </Modal.Body>
      </Modal>
  
      <Modal show={showDetails} onHide={() => setShowDetails(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPet && (
            <div>
              <img src={selectedPet.imageUrl} alt={`Image of ${selectedPet.name}`} className="img-fluid" />
              <p>Name: {selectedPet.name}</p>
              <p>Species: {selectedPet.species}</p>
              <p>Breed: {selectedPet.breed}</p>
              <p>Age: {selectedPet.age}</p>
              <p>Gender: {selectedPet.gender}</p>
              <p>Health Status: {selectedPet.healthStatus}</p>
              <p>Behavior: {selectedPet.behavior}</p>
              <p>Description: {selectedPet.description}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* List of Pets */}
      <div className="pet-list mt-4">
        {pets.map(pet => (
          <div key={pet.id} className="pet-card" onClick={() => handleCardClick(pet)}>
            <img src={pet.imageUrl} alt={`Image of ${pet.name}`} />
            <div className="pet-card-info">
              <div>
                <span>Species: {pet.species}</span>
                <span>&nbsp; Age: {pet.age}</span>
              </div>
              <div>
                <span>Breed: {pet.breed}</span>
                <span>&nbsp; Gender: {pet.gender}</span>
              </div>
              <div>Name: {pet.name}</div>
            </div>
            <div className="pet-card-actions">
              <Button variant="info" onClick={() => handleEdit(pet)}>&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
              <Button variant="danger" onClick={() => handleDelete(pet.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

    </>
  );
  
};

export default PetManagement;
