import React, { useState } from 'react';
import { FaPaw } from 'react-icons/fa';
import { httpRequest } from '../HttpProxy';
import ManagerSidebar from '../components/ManagerSidebar';


type ShelterFormData =  {
    name: string;
    location: string;
    emailAddress: string; // Shelter email
    phoneNumber: string;
}




const ShelterForm: React.FC = () => {
    const [formData, setFormData] = useState<ShelterFormData>({
        name: '',
        location: '',
        emailAddress: '',
        phoneNumber: '',

    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        httpRequest('post', '/api/shelters/create_shelter', formData)
          .then((response) => {
            if (response.status == 200) {
              // Show an alert when the response status is 200
              alert('Shelter Created');
              setFormData({
                name: '',
                location: '',
                emailAddress: '',
                phoneNumber: '',
            });
            } else {
              // Show an alert for other status codes
              alert('failed to create' + response.status);
            }
          })
          .catch((error) => {
            // Handle any errors that occur during the HTTP request
            console.error('Request error:', error);
          });
      };
      
      

    // Updated styles
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw', // Use vw for full viewport width
            backgroundColor: '#f2f2f2', // Soft background color
        },
        formWrapper: {
            width: '100%',
            maxWidth: '600px', // Set a max-width that's appropriate for your design
            margin: 'auto', // Center in the page
            padding: '50px', // Adjust padding as needed
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff8f0', // Light, warm background color
            border: '2px solid #ffd6a5', // Soft border color
        },
        formGroup: {
            marginBottom: '20px', // Adjust space between form groups
        },
        label: {
            fontWeight: 'bold',
            fontSize: '16px', // Set appropriate font size
            marginBottom: '10px', // Space between label and input
            color: '#ff8800', // Warm text color for labels
        },
        input: {
            width: '100%', // Ensure full width of form group
            fontSize: '16px',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fffcee'
        },
        button: {
            padding: '15px 30px', // Adjust padding to increase the size of the button
            fontSize: '16px', // Set appropriate font size
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px', // Add space above the button if needed
            backgroundColor: '#ffab73', // Warm button color
            borderColor: '#ff8800', // Border color for the button
        },
        icon: {
            fontSize: '24px',
            color: '#ff8800',
            marginRight: '10px',
        }
    };

    return (
        <div style={styles.container}>
            <ManagerSidebar />
            <div style={styles.formWrapper}>
                <form onSubmit={handleSubmit}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <FaPaw style={styles.icon} />
                        <h2>Create a Shelter</h2>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Shelter Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Location:</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email Address:</label>
                        <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Phone:</label>
                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} style={styles.input} />
                    </div>

                    <button type="submit" style={styles.button}>
                        <FaPaw style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                        Create Shelter
                    </button>
                </form>
            </div>
        </div>
    );
};
export default ShelterForm;
