import React, { useState, useEffect } from 'react';
import './Profile.css';
import { httpRequest } from '../../HttpProxy';
import {getUserId} from '../../CurrentSession'
import Sidebar from '../../components/SidebarAdopter';

type Adopter = {
userId: number;
  name: string;
  emailAddress: string;
  phoneNumber: string;
};

const AdopterProfile: React.FC = () => {
  const [adopterData, setAdopterData] = useState<Adopter | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const fetchAdopterData = async () => {
      try {
        // Assume '1' is the adopterId for the logged-in user; replace with dynamic value as needed.
        const userId = getUserId(); // Replace this with your dynamic ID

        // Then you can use it in your API call
        const response = await httpRequest('get', `/api/adopters/get_adopter_byID?id=${userId}`);
        if (response.status === 200) {
          setAdopterData(response.data);
        } else {
          throw new Error('Failed to fetch adopter data');
        }
      } catch (error) {
        console.error('Error fetching adopter data:', error);
      }
    };

    fetchAdopterData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAdopterData((prevAdopterData) => (prevAdopterData ? { ...prevAdopterData, [name]: value } : null));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdateMessage('');
  };

  const handleUpdateClick = async () => {
    if (adopterData) {
      try {
        const response = await httpRequest('put', `/api/adopters/update_adopter?id=${adopterData.userId}`, adopterData);
        if (response.status === 200) {
          setAdopterData(response.data);
          setUpdateMessage('Profile updated successfully!');
        } else {
          throw new Error('Failed to update adopter data');
        }
      } catch (error) {
        console.error('Error updating adopter data:', error);
        setUpdateMessage('Failed to update profile. Please try again.');
      }
      setIsEditing(false);
      setTimeout(() => setUpdateMessage(''), 5000);
    }
  };

  const containerStyle: React.CSSProperties = {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    minWidth: '100vw',
    padding: '20px',
    boxSizing: 'border-box',
  };

  return (
    <div style={containerStyle} className="profile-container">
      <Sidebar />
      <div className="profile-header">
        <h1>Adopter Profile</h1>
        {!isEditing && (
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
        )}
      </div>

      {isEditing ? (
        <div className="profile-edit-fields">
          <input 
            type="text" 
            name="name" 
            value={adopterData?.name} 
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input 
            type="tel" 
            name="phoneNumber" 
            value={adopterData?.phoneNumber} 
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
          {/* Include other fields as necessary */}
        </div>
      ) : (
        <div className="profile-info">
          {adopterData && <p><strong>ID:</strong> {adopterData.userId}</p>}
          <p><strong>Name:</strong> {adopterData?.name}</p>
          {adopterData && <p><strong>Email Address:</strong> {adopterData.emailAddress}</p>}
          {adopterData && adopterData.phoneNumber && <p><strong>Phone Number:</strong> {adopterData.phoneNumber}</p>}
        </div>
      )}

      {isEditing && (
        <div className="profile-actions">
          <button className="update-button" onClick={handleUpdateClick}>Update</button>
          <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
        </div>
      )}

      {updateMessage && <div className="notification">{updateMessage}</div>}
    </div>
  );
};

export default AdopterProfile;
