import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { httpRequest } from '../HttpProxy'; // Assuming you have an HTTP utility for requests

type Shelter = {
    shelterId: number;
    name: string;
    location: string;
    emailAddress: string;
    phoneNumber: string;
};

const AdminSheltersPage: React.FC = () => {
    const initialShelters: Shelter[] = [
        { shelterId: 1, name: 'Happy Tails Shelter', location: '123 Bark Street', emailAddress: 'contact@happytails.com', phoneNumber: '123-456-7890' },
        { shelterId: 2, name: 'Furry Friends', location: '456 Meow Avenue', emailAddress: 'info@furryfriends.org', phoneNumber: '987-654-3210' },
        { shelterId: 3, name: 'Paws and Claws', location: '789 Paw Lane', emailAddress: 'support@pawsclaws.net', phoneNumber: '555-123-4567' },
    ];

    const [shelters, setShelters] = useState<Shelter[]>(initialShelters);
    const [editingShelterId, setEditingShelterId] = useState<number | null>(null);
    const [editedShelter, setEditedShelter] = useState<Shelter | null>(null);

    useEffect(() => {
        fetchShelters();
    }, []);

    const fetchShelters = async () => {
        try {
            const response = await httpRequest('get', '/api/shelters/get_all_shelters');
            if (response.status === 200) {
                setShelters(response.data);
            } else {
                // Handle non-200 responses
                console.error('Failed to fetch shelters:', response.status);
            }
        } catch (error) {
            console.error('Error fetching shelters:', error);
        }
    };
    

    function handleActionClick(id: number): void {
        alert('Function not implemented.');
    }
    const handleEditClick = (shelter: Shelter): void => {
        setEditingShelterId(shelter.shelterId);
        setEditedShelter({ ...shelter });
    };

    const handleSaveClick = async (): Promise<void> => {
        if (editedShelter) {
            // Implement save logic here
            // Example: await httpRequest('put', `/api/shelters/update_shelter`, editedShelter);
            try {
                const response = await httpRequest('put', `/api/shelters/update_shelter`, editedShelter);
                if (response.status === 200) {
                    alert('Shelter updated');
                    fetchShelters();
                } else {
                    // Handle non-200 responses
                    console.error('Failed to update shelter:', response.status);
                }
            } catch (error) {
                console.error('Error updating shelter:', error);
            }
            setEditingShelterId(null);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedShelter({
            ...editedShelter!,
            [e.target.name]: e.target.value
        });
    };
    async function handleDeleteClick(id: number): Promise<void> {
        try {
            const response = await httpRequest('delete', `/api/shelters/delete_shelter?id=${id}`);
            if (response.status === 200) {
                alert('Shelter deleted');
                fetchShelters();
            } else {
                // Handle non-200 responses
                console.error('Failed to delete shelter:', response.status);
            }
        } catch (error) {
            console.error('Error deleting shelter:', error);
        }
    }

    return (
        <div style={styles.mainContainer}>
            <Container fluid style={styles.tableContainer}>
                <h1 style={styles.header}>Shelter Administration</h1>
                <Table striped bordered hover variant="dark" responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shelters.map(shelter => (
                            <tr key={shelter.shelterId}>
                                {editingShelterId === shelter.shelterId ? (
                                    // Render input fields for editing
                                    <>
                                        <td>{shelter.shelterId}</td>
                                        <td><input type="text" name="name" value={editedShelter?.name} onChange={handleChange} /></td>
                                        <td><input type="text" name="location" value={editedShelter?.location} onChange={handleChange} /></td>
                                        <td><input type="text" name="emailAddress" value={editedShelter?.emailAddress} onChange={handleChange} /></td>
                                        <td><input type="text" name="phoneNumber" value={editedShelter?.phoneNumber} onChange={handleChange} /></td>
                                        <td>
                                            <Button variant="success" onClick={handleSaveClick}>Save</Button>
                                            <Button variant="secondary" onClick={() => setEditingShelterId(null)}>Cancel</Button>
                                        </td>
                                    </>
                                ) : (
                                    // Render text
                                    <>
                                        <td>{shelter.shelterId}</td>
                                        <td>{shelter.name}</td>
                                        <td>{shelter.location}</td>
                                        <td>{shelter.emailAddress}</td>
                                        <td>{shelter.phoneNumber}</td>
                                        <td>
                                            <Button variant="warning" onClick={() => handleEditClick(shelter)}>Edit</Button>
                                            <Button variant="danger" onClick={() => handleDeleteClick(shelter.shelterId)}>Delete</Button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};
const styles = {
    mainContainer: {
        backgroundColor: 'white', // Soft color for a pet adoption theme
        color: 'black',
        height: '100vh',
        width: '100vw',
        padding: '1rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableContainer: {
        height: '100%',
        padding: '0',
        maxWidth: '80%',
    },
    header: {
        color: '#FF6F61', // Warm color that fits the pet theme
        textAlign: 'center' as 'center',
        marginBottom: '1rem',
    },
    tableCell: {
        padding: '10px',
        border: '1px solid #ddd',
    },
    actionButton: {
        padding: '10px',
        border: '1px solid #ddd',
        margin: '0 5px', // To add some space between buttons
    },
};

export default AdminSheltersPage;
