import React, { useState, useEffect, useRef } from 'react';
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

    //////////////////

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sheltersPerPage] = useState<number>(10);
    const indexOfLastShelter = currentPage * sheltersPerPage;
    const indexOfFirstShelter = indexOfLastShelter - sheltersPerPage;
    const currentShelters = shelters.slice(indexOfFirstShelter, indexOfLastShelter);
    const totalShelterPages = Math.ceil(shelters.length / sheltersPerPage);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    ////////////


    const [showAddStaffModal, setShowAddStaffModal] = useState<boolean>(false);
    const [inputStaffId, setInputStaffId] = useState<number | null>(null);
    const [selectedShelterId, setSelectedShelterId] = useState<number | null>(null);

    const showAddStaffPopup = (shelterId: number) => {
        setSelectedShelterId(shelterId);
        setShowAddStaffModal(true);
    };

    const AddStaffPopup: React.FC = () => {
        if (!showAddStaffModal) return null;
        const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input element
        const [inputStaffId, setInputStaffId] = useState<number | null>(null);
        useEffect(() => {
            // Focus on the input element when the modal renders
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, []);
    
    
        const handleAddStaff = async () => {
            if (inputStaffId && selectedShelterId) {
                try {
                    // Replace this URL with your actual endpoint
                    const response = await httpRequest('put', `/api/staff/set_shelter?staffId=${inputStaffId}&shelterId=${selectedShelterId}`);
                    if (response.status === 200) {
                        alert('Staff member added successfully');
                        // Reload staff members or shelters as needed
                    } else {
                        console.error('Failed to add staff member:', response.status);
                    }
                } catch (error) {
                    console.error('Error adding staff member:', error);
                }
            }
            setShowAddStaffModal(false);
        };
        const overlayStyle: React.CSSProperties = {
            position: 'fixed', // Fixed position to cover the whole viewport
            top: 0,           // Start from the top edge
            left: 0,          // Start from the left edge
            right: 0,         // Stretch to the right edge
            bottom: 0,        // Stretch to the bottom edge
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
            display: 'flex',  // Use flexbox for centering the modal
            alignItems: 'center', // Vertically center the content
            justifyContent: 'center', // Horizontally center the content
            zIndex: 1050,     // High z-index to keep it above other elements
        };
        const popupStyle: React.CSSProperties = {
            backgroundColor: '#fff',     // White background for the popup content
            padding: '20px',             // Padding inside the popup
            borderRadius: '5px',         // Rounded corners
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)', // Shadow for 3D effect
            zIndex: 1051,                // Higher z-index than overlay to appear on top
            display: 'flex',             // Flexbox layout
            flexDirection: 'column',     // Column layout for the content
            maxWidth: '600px',           // Maximum width of the popup
            maxHeight: '80vh',           // Maximum height (80% of the viewport height)
            overflow: 'auto',            // Scroll inside if content is too large
            position: 'fixed',           // Fixed position to stay in place
            top: '50%',                  // Center vertically
            left: '50%',                 // Center horizontally
            transform: 'translate(-50%, -50%)', // Adjust position to truly center
        };
        
        
        
    
        return (
            <div style={overlayStyle}>
                <div style={popupStyle}>
                    <h2>Add Staff Member</h2>
                    <input 
                        type="text" 
                        value={inputStaffId ?? ''} 
                        onChange={(e) => setInputStaffId(Number(e.target.value))} 
                        placeholder="Enter Staff ID"
                        ref={inputRef} // Attach the ref to the input element
                    />
                    <Button onClick={handleAddStaff}>Add</Button>
                    <Button onClick={() => setShowAddStaffModal(false)}>Cancel</Button>
                </div>
            </div>
        );
    };
    




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
        ///////////////////////////////////////////////

        
       



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
            padding: '5px 10px',
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
                    <button onClick={onClose} style={closeButtonStyle} className='btn btn-primary'>Close</button>
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
            backgroundColor: '#fff8f2', // A soft, warm background color
            width: '430px', // Maintain the width
            height: '100%', // Full height
            position: 'fixed',
            right: 0,
            top: 0,
            overflowY: 'auto', // Scrollable content
            zIndex: 1000, // Above other content
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
            borderRadius: '10px 0 0 10px', // Rounded corners on the left side
        };
        
        const tableStyle: React.CSSProperties = {
            tableLayout: 'auto',
            width: '100%',
            borderRadius: '8px', // Rounded corners for tables
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Consistent with other elements
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
                <h1 style={styles.header}>Shelters Administration</h1>
                <button style={{ backgroundColor: 'lightpink', color: 'white' }} onClick={fetchAllStaffMembers}>Show All Staff Members</button>
                <Table striped bordered hover variant="light" responsive>
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
                        {currentShelters.map(shelter => (
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
                                            <Button variant="warning" onClick={() => handleEditClick(shelter)} style={{ marginRight: '5px' }}>Edit</Button>
                                            <Button variant="danger" onClick={() => handleDeleteClick(shelter.shelterId)} style={{ marginRight: '5px' }}>Delete</Button>
                                            <Button variant="info" onClick={() => fetchStaffMembers(shelter.shelterId)} style={{ marginRight: '5px' }}>Show Staff</Button>
                                            <Button variant="primary" onClick={() => showAddStaffPopup(shelter.shelterId)}>Add Staff</Button>


                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="pagination">
                {Array.from({ length: totalShelterPages }, (_, index) => (
                    <Button key={index + 1} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Button>
                ))}
            </div>
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
            <AddStaffPopup />
        </div>
    );
};
const styles = {
    mainContainer: {
        backgroundColor: '#f0eae3', // A soft, warm background color
        color: '#4a4a4a', // A darker shade for text for better readability
        height: '100vh',
        width: '100vw',
        padding: '0', // Increased padding for better spacing
        display: 'flex',
        flexDirection: 'column' as 'column', // Align items in a column
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableContainer: {
        backgroundColor: 'white', // Keep it white for clarity
        borderRadius: '15px', // Rounded corners for a softer look
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // A light shadow for depth
        padding: '1rem',
        maxWidth: '90%', // Adjust width for better layout
        margin: '0 auto', // Center align the container
    },
    header: {
        color: '#ff6f61', // Warm, welcoming color
        fontSize: '1.6rem', // Larger font size
        fontWeight: 'bold',
        textAlign: 'center' as 'center', // Center align the text
        marginBottom: '2rem', // More space below the header
        position: 'relative',
        top: '30px'
    },
    tableCell: {
        padding: '12px', // Slightly more padding for table cells
        border: '1px solid #ddd',
        textAlign: 'left', // Align text to the left for readability
    },
    actionButton: {
        padding: '8px 15px', // Adjust padding for buttons
        border: 'none', // Remove border
        borderRadius: '4px', // Rounded corners for buttons
        backgroundColor: '#ff6f61', // Matching the theme's warm color
        color: 'white', // Text color for contrast
        margin: '0 5px',
        cursor: 'pointer', // Cursor pointer on hover
        fontSize: '0.9rem', // Adjust font size
        fontWeight: 'bold',
    },
};




export default AdminSheltersPage;
