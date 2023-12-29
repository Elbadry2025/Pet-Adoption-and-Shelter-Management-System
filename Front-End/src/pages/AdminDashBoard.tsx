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

type StaffMember = {
    staffId: number;
    emailAddress: string;
    name: string;
    passwordHash: string;
    phoneNumber: string;
    role: string;
    shelterId: number;
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
    const [showStaffPopup, setShowStaffPopup] = useState<boolean>(false);
    const [allStaffMembers, setAllStaffMembers] = useState<StaffMember[]>([]);
    const [shelterStaffMembers, setShelterStaffMembers] = useState<StaffMember[]>([]);

    const [showSidebar, setShowSidebar] = useState<boolean>(false);



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

    const fetchStaffMembers = async (shelterId: number) => {
        try {
            const response = await httpRequest('get', `/api/staff/get_staff_byShelterId?shelterId=${shelterId}`);
            if (response.status === 200) {
                console.log(response.data);
                setShelterStaffMembers(response.data);
                setShowStaffPopup(true);
            } else {
                console.error('Failed to fetch staff:', response.status);
            }
        } catch (error) {
            console.error('Error fetching staff:', error);
        }
    };

    const fetchAllStaffMembers = async () => {
        try {
            const response = await httpRequest('get', `/api/staff/get_staff_byRole?role=${'Staff Member'}`);
            if (response.status === 200) {
                setAllStaffMembers(response.data);
                setShowSidebar(true);
            } else {
                console.error('Failed to fetch staff:', response.status);
            }
        } catch (error) {
            console.error('Error fetching staff:', error);
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
    type StaffMemberPopupProps = {
        staffMembers: StaffMember[];
        show: boolean;
        onClose: () => void;
    };
    
    const StaffMemberPopup: React.FC<StaffMemberPopupProps> = ({ staffMembers, show, onClose }) => {
        if (!show) return null;

        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 5; // Adjust the number of items per page as needed

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentStaffMembers = staffMembers.slice(indexOfFirstItem, indexOfLastItem);
        const totalPages = Math.ceil(staffMembers.length / itemsPerPage);

        const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


        const overlayStyle: React.CSSProperties = {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent backdrop
            display: 'flex',
            alignItems: 'center', // This centers the popup vertically
            justifyContent: 'center', // This centers the popup horizontally
            zIndex: 1050, // Make sure it's on top of other content
        };
    
        // Styles for the popup itself
        const popupStyle: React.CSSProperties = {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            zIndex: 1051, // Above the overlay
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '600px', // Set a max-width or width as needed
            maxHeight: '80vh', // Limit the height of the popup
            overflow: 'auto', // Enable scroll if content is too long
        };
    
        // Styles for the close button
        const closeButtonStyle: React.CSSProperties = {
            alignSelf: 'flex-end',
            padding: '5px 10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
        };
    
        return (
            <div style ={overlayStyle}>
                <div className="staff-popup" style={popupStyle}>
                    <h2>Staff Members</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentStaffMembers.map((member) => (
                                <tr key={member.staffId}>
                                    <td>{member.staffId}</td>
                                    <td>{member.name}</td>
                                    <td>{member.emailAddress}</td>
                                    <td>{member.phoneNumber}</td>
                                    <td>{member.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                    <button onClick={onClose} style={closeButtonStyle}>Close</button>
                </div>
            </div>
        );
    };

    type StaffSidebarProps = {
        staffMembers: StaffMember[];
        show: boolean;
        onClose: () => void;
    };
    
    const StaffSidebar: React.FC<StaffSidebarProps> = ({ staffMembers, show, onClose }) => {
        if (!show) return null;
    
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 10; // Adjust the number of items per page as needed
    
        // Calculate the index of the first and last items on the current page
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
        // Slice the current page items from staffMembers
        const currentItems = staffMembers.slice(indexOfFirstItem, indexOfLastItem);
    
        // Calculate total pages
        const totalPages = Math.ceil(staffMembers.length / itemsPerPage);
    
        // Function to change page
        const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
        const sidebarStyle: React.CSSProperties = {
            backgroundColor: '#f0f0f0', // Example background color
            width: '450px', // You can adjust the width
            height: '100%', // Adjust the height as needed
            position: 'fixed',
            right: 0,
            top: 0,
            overflowY: 'auto', // for scrollable content
            zIndex: 1000, // Ensure it's above other content
            padding: '20px',
            // Add other styling as needed
        };

        const tableStyle: React.CSSProperties = {
            tableLayout: 'auto',
            width: '100%',
        };
        
        const cellStyle: React.CSSProperties = {
            textAlign: 'left',
            padding: '8px',
            border: '1px solid #ddd',
            overflow: '',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        };
    
        return (
            <div className="staff-sidebar" style={sidebarStyle}>
                <h2>All Staff Members</h2>
                <table className="staff-table" style={tableStyle}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Shelter ID</th>
                            {/* Consider removing or securely handling passwordHash */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((member) => (
                            <tr key={member.staffId}>
                                <td style={cellStyle}>{member.staffId}</td>
                                <td style={cellStyle}>{member.name}</td>
                                <td style={cellStyle}>{member.emailAddress}</td>
                                <td style={cellStyle}>{member.phoneNumber}</td>
                                <td style={cellStyle}>{member.shelterId}</td>
                                {/* Consider removing or securely handling passwordHash */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button onClick={onClose}>Close Sidebar</button>
            </div>
        );
    };
    
    
    
    
    
    

    return (
        <div style={styles.mainContainer}>
            <Container fluid style={styles.tableContainer}>
                <h1 style={styles.header}>Shelter Administration</h1>
                <button onClick={fetchAllStaffMembers}>Show All Staff</button>
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
                                            <Button variant="info" onClick={() => fetchStaffMembers(shelter.shelterId)}>Show Staff</Button>

                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <StaffMemberPopup 
                    staffMembers={shelterStaffMembers} 
                    show={showStaffPopup} 
                    onClose={() => setShowStaffPopup(false)} 
                />
            </Container>
            <StaffSidebar 
                staffMembers={allStaffMembers} 
                show={showSidebar} 
                onClose={() => setShowSidebar(false)} 
            />
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
