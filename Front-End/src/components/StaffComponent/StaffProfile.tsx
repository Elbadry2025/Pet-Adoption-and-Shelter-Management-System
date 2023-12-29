import React, { useState ,useEffect } from 'react';
import './StaffProfile.css'; 
import { httpRequest } from '../../HttpProxy';

type Shelter = {
  shelterId: number;
  name: string;
  location: string;
  emailAddress: string;
  phoneNumber: string;
};

type Staff = {
  staffId: number;
  role: string;
  shelter: Shelter;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  password: string; 
};

const StaffProfile: React.FC = () => {
  const [staffData, setStaffData] = useState<Staff>({
    staffId: 0,
    role: '',
    shelter: {
      shelterId: 0,
      name: '',
      location: '',
      emailAddress: '',
      phoneNumber: '',
    },
    name: '',
    emailAddress: '',
    phoneNumber: '',
    password: '',
  });

  const [editableStaffData, setEditableStaffData] = useState<Staff>({ ...staffData });
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableStaffData({ ...editableStaffData, [event.target.name]: event.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setEditableStaffData({ ...staffData });
    setIsEditing(false);
    setUpdateMessage('');
  };

  //API
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await httpRequest('get','/api/staff/get_staff_byID');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const fetchedData: Staff = await response.json();
        setStaffData(fetchedData);
        setEditableStaffData({ ...fetchedData });
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };
    fetchStaffData();
  }, []);

  //APIIII update
  const handleUpdateClick = () => {
    setStaffData({ ...staffData, name: editableStaffData.name, emailAddress: editableStaffData.emailAddress, phoneNumber: editableStaffData.phoneNumber, role: editableStaffData.role });
    setIsEditing(false);
    setUpdateMessage('Profile updated successfully!');
    setTimeout(() => setUpdateMessage(''), 2000);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Staff Profile</h1>
        {!isEditing && (
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
        )}
      </div>

      {isEditing ? (
        <div className="profile-info">
          <div><input type="text" name="name" value={editableStaffData.name} onChange={handleInputChange} /></div>
          <div><input type="text" name="emailAddress" value={editableStaffData.emailAddress} onChange={handleInputChange} /></div>
          <div><input type="text" name="phoneNumber" value={editableStaffData.phoneNumber} onChange={handleInputChange} /></div>
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>Name:</strong> {staffData.name}</p>
          <p><strong>Email Address:</strong> {staffData.emailAddress}</p>
          <p><strong>Phone Number:</strong> {staffData.phoneNumber}</p>
          <p><strong>Role:</strong> {staffData.role}</p>
          <p><strong>Shelter:</strong> {staffData.shelter.name}</p>
          <p><strong>Location:</strong> {staffData.shelter.location}</p>
          <p><strong>Shelter Email:</strong> {staffData.shelter.emailAddress}</p>
          <p><strong>Shelter Phone:</strong> {staffData.shelter.phoneNumber}</p>
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
