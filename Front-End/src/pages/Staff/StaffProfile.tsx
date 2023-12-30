import React, { useState ,useEffect } from 'react';
import './StaffProfile.css'; 
import { httpRequest } from '../../HttpProxy';
import {getUserId} from '../../CurrentSession'
import Sidebar from '../../components/SidebarStaff';




type Staff = {
  staffId: number;
  name: string;
  role: string;
  emailAddress: string;
  phoneNumber: string;
  shelterId: number;
};

const StaffProfile: React.FC = () => {
  const [staffData, setStaffData] = useState<Staff | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        // Assuming you have a variable staffId that holds the dynamic ID
        const staffId = getUserId(); // Replace this with your dynamic ID

        // Then you can use it in your API call
        const response = await httpRequest('get', `/api/staff/get_staff_byID?id=${staffId}`);

        if (response.status === 200) {
          setStaffData(response.data);
        } else {
          throw new Error('Failed to fetch staff data');
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStaffData((prevStaffData) => (prevStaffData ? { ...prevStaffData, [name]: value } : null));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdateMessage('');
  };

  const handleUpdateClick = async () => {
    if (staffData) {
      try {
        const response = await httpRequest('put', '/api/staff/update_staff_member?id=' + staffData.staffId, staffData);
        if (response.status === 200) {
          setStaffData(response.data);
          setUpdateMessage('Profile updated successfully!');
        } else {
          throw new Error('Failed to update staff data');
        }
      } catch (error) {
        console.error('Error updating staff data:', error);
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
      <Sidebar/>
      <div className="profile-header">
        <h1>Staff Profile</h1>
        {!isEditing && (
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
        )}
      </div>

      {isEditing ? (
        <div className="profile-edit-fields">
          <input 
            type="text" 
            name="name" 
            value={staffData?.name} 
            onChange={handleInputChange}
            placeholder="Name"
          />

          <input 
            type="tel" 
            name="phoneNumber" 
            value={staffData?.phoneNumber} 
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
          {/* Include other fields as necessary */}
        </div>
      ) : (
        <div className="profile-info">
          {staffData && <p><strong>ID:</strong> {staffData.staffId}</p>}
          <p><strong>Name:</strong> {staffData?.name}</p>
          {staffData && <p><strong>Email Address:</strong> {staffData.emailAddress}</p>}
          {staffData && staffData.phoneNumber && <p><strong>Phone Number:</strong> {staffData.phoneNumber}</p>}
          {staffData && <p><strong>Role:</strong> {staffData.role}</p>}
          {staffData && <p><strong>ShelterID:</strong> {staffData.shelterId}</p>}
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


export default StaffProfile;
