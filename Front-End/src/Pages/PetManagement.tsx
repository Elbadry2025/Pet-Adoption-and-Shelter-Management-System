import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import "./PetManagement.css"
import { httpRequest } from '../HttpProxy';

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
  imageUrls: string[]; // Change to an array to hold multiple images
}

const PetManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [imageInputs, setImageInputs] = useState([{ id: 1, file: null }]);
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
    imageUrls: [],
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsPet, setDetailsPet] = useState<PetProfile | null>(null);
  const [incompleteData, setIncompleteData] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ------------------------------------ Card Details ----------------------------------------//
  const handleCardClick = (pet: PetProfile) => {
    setDetailsPet(pet);
    setShowDetailsModal(true);
    setCurrentImageIndex(0); // Reset to the first image
  };
  
  const closeModal = () => {
    setShowDetailsModal(false);
    setDetailsPet(null);
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      const totalImages = detailsPet?.imageUrls?.length ?? 0;
      return nextIndex < totalImages ? nextIndex : 0; // Loop back to the first image
    });
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex(prevIndex => {
      const prevIndexValue = prevIndex - 1;
      const totalImages = detailsPet?.imageUrls?.length ?? 0;
      return prevIndexValue >= 0 ? prevIndexValue : totalImages - 1; // Loop back to the last image
    });
  };
  
  const addPet = () => {
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
      imageUrls: [],
    });
    setIsEditMode(false);
    setShowForm(true);
    setIncompleteData(false);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };
  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, pet: PetProfile) => {
    event.stopPropagation();
    handleEdit(pet);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, petId: number) => {
    event.stopPropagation();
    handleDelete(petId);
  };

  const handleEdit = (pet: PetProfile) => {
    setShowForm(true);
    setIsEditMode(true);
    setIncompleteData(false);
    setForm(pet);
  };

  const handleDelete = (petId: number) => {
    setPets(pets.filter(pet => pet.id !== petId));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid()) {
      setIncompleteData(true);
      return;
    }
    if (isEditMode) {
      setPets(pets.map(pet => (pet.id === form.id ? form : pet)));
    } else {
      const newId = pets.length > 0 ? pets[pets.length - 1].id + 1 : 1;
      const newPet = { ...form, id: newId }; // Generate a new ID for new pets
      setPets([...pets, newPet]);
    }
    setShowForm(false);
    setIsEditMode(false);
    setIncompleteData(false);
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
      imageUrls: [],
    });
  };
  const isFormValid = () => {
    // Check if all required fields are filled in
    return (
      form.name.trim() !== '' &&
      form.species.trim() !== '' &&
      form.breed.trim() !== '' &&
      form.age.trim() !== '' &&
      form.gender.trim() !== '' &&
      form.healthStatus.trim() !== '' &&
      form.behavior.trim() !== '' &&
      form.description.trim() !== '' &&
      form.imageUrls.length !== 0 
    );
  };
  
  const handleImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    // Assert that event.currentTarget is an HTMLInputElement
    const fileInput = event.currentTarget as HTMLInputElement;
    const files = fileInput.files;
    if (files && files[0]) {
      const img = files[0];
      const reader = new FileReader();
      reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
        // Assert that loadEvent.target is not null and is a FileReader
        const target = loadEvent.target as FileReader | null;
        if (target && target.result) {
          setForm((prevForm) => {
            const newImageUrls = [...prevForm.imageUrls];
            newImageUrls[index] = target.result as string;
            return { ...prevForm, imageUrls: newImageUrls };
          });
        }
      };
      reader.readAsDataURL(img);
    }
  };
  

  const handleAddImageInput = () => {
    setImageInputs((prevInputs) => [
      ...prevInputs,
      { id: prevInputs.length + 1, file: null },
    ]);
  };
  
  const handleRemoveImageInput = (id: number) => {
    setImageInputs((prevInputs) => prevInputs.filter(input => input.id !== id));
    setForm((prevForm) => {
      // Create a new array of image URLs, excluding the one that corresponds to the removed input
      const newImageUrls = prevForm.imageUrls.filter((url, index) => index !== id - 1);
      return { ...prevForm, imageUrls: newImageUrls };
    });
  };
  

  return (
    <>
      <Button variant="primary" onClick={addPet} style={{alignContent:'left', display:'flex'}}>Add Pet</Button>
  
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit Pet' : 'Add Pet'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name*</Form.Label>
              <Form.Control type="text" placeholder="Enter pet name" name="name" value={form.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Species*</Form.Label>
              <Form.Control type="text" placeholder="Enter species" name="species" value={form.species} onChange={handleChange} />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Breed*</Form.Label>
              <Form.Control type="text" placeholder="Enter breed" name="breed" value={form.breed} onChange={handleChange} />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Age*</Form.Label>
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
              <Form.Label>Health Status*</Form.Label>
              <Form.Control type="text" placeholder="Enter health status" name="healthStatus" value={form.healthStatus} onChange={handleChange} />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Behavior*</Form.Label>
              <Form.Control type="text" placeholder="Enter behavior" name="behavior" value={form.behavior} onChange={handleChange} />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Description*</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={form.description} onChange={handleChange} />
            </Form.Group>
  
            {imageInputs.map((input, index) => (
              <Form.Group key={input.id} className="mb-3">
                <Form.Label>Image {index + 1}</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageChange(index, e)} // Correctly type the event here
                  />
                  <Button variant="danger" onClick={() => handleRemoveImageInput(input.id)}>
                    Delete
                  </Button>
                </div>
              </Form.Group>
            ))}
            {incompleteData && (<Form.Group className="mb-3">
                <Form.Label style={{color:'red'}}>Please, fill all data about the pet</Form.Label>
              </Form.Group>
            )}
            <Button variant="info" onClick={handleAddImageInput} style={{marginRight: '10px'}}>Add Image</Button>
            <Button variant="success" type="submit" style={{marginRight: "15px"}}>Confirm</Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/*----------------------- Pet Details Modal -----------------------*/}
      <Modal show={showDetailsModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailsPet && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img 
                src={detailsPet.imageUrls[currentImageIndex]} 
                alt={`Image ${currentImageIndex + 1} of ${detailsPet.name}`} 
                className="img-fluid" 
              />
              <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Button onClick={handlePrevImage} style={{ marginRight: '20px' }}>Previous</Button>
                <Button onClick={handleNextImage}>Next</Button>
              </div>
              <div style={{ textAlign: 'left', marginTop: '20px', width: '100%' }}>
                <h5>Name: {detailsPet.name}</h5>
                <h5>Species: {detailsPet.species}</h5>
                <h5>Breed: {detailsPet.breed}</h5>
                <h5>Age: {detailsPet.age}</h5>
                <h5>Gender: {detailsPet.gender}</h5>
                <h5>Health Status: {detailsPet.healthStatus}</h5>
                <h5>behavior: {detailsPet.behavior}</h5>
                <h5>Description: {detailsPet.description}</h5>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/*----------------------- List of Pets -----------------------*/}
      <div className="pet-list mt-4">
        {pets.map(pet => (
          <div key={pet.id} className="pet-card" onClick={() => handleCardClick(pet)}>
              <img src={pet.imageUrls[0]} alt={`Image of ${pet.name}`} /> {/* Display only the first image */}

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
              <Button variant="info" onClick={(e) => handleEditClick(e, pet)}>&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
              <Button variant="danger" onClick={(e) => handleDeleteClick(e, pet.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
  
};

export default PetManagement;
