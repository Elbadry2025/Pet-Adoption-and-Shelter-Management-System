import React, { useState } from 'react';
import './StaffProfile.css'; 

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
  // Initial mock data for the staff profile
  const initialStaffData: Staff = {
    staffId: 1,
    role: 'Shelter Manager',
    shelter: {
      shelterId: 1,
      name: 'Happy Tails Shelter',
      location: '1234 Park Ave',
      emailAddress: 'contact@happytailsshelter.com',
      phoneNumber: '555-1234'
    },
    name: 'Jane Doe',
    emailAddress: 'jane.doe@example.com',
    phoneNumber: '555-7890',
    password: '', // In a real application, you wouldn't include the password here
  };

  const [staffData, setStaffData] = useState<Staff>(initialStaffData);
  const [editableStaffData, setEditableStaffData] = useState<Staff>({ ...initialStaffData });
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle input changes for staff details
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableStaffData({ ...editableStaffData, [event.target.name]: event.target.value });
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Cancel editing and revert changes
  const handleCancelClick = () => {
    setEditableStaffData({ ...staffData });
    setNewPassword('');
    setConfirmPassword('');
    setIsEditing(false);
    setUpdateMessage('');
  };

  const handleUpdateClick = () => {
    if (newPassword !== confirmPassword) {
      setUpdateMessage('Passwords do not match. Please try again.');
      setTimeout(() => setUpdateMessage(''), 2000); // Message disappears after 2 seconds
      return;
    }

    // API call to update staff profile would go here
    console.log('Submit this data to your API:', editableStaffData);

    // Simulate an API response with success message
    setStaffData({ ...editableStaffData, password: newPassword });
    setIsEditing(false);
    setUpdateMessage('Profile updated successfully!');
    setTimeout(() => setUpdateMessage(''), 2000); // Message disappears after 2 seconds
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
        <div><input type="text" name="role" value={editableStaffData.role} onChange={handleInputChange} /></div>
        <div><input type="text" name="shelter.name" value={editableStaffData.shelter.name} onChange={handleInputChange} /></div>
        <div><input type="text" name="shelter.location" value={editableStaffData.shelter.location} onChange={handleInputChange} /></div>
        <div><input type="text" name="shelter.emailAddress" value={editableStaffData.shelter.emailAddress} onChange={handleInputChange} /></div>
        <div><input type="text" name="shelter.phoneNumber" value={editableStaffData.shelter.phoneNumber} onChange={handleInputChange} /></div>
        <div><input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
        <div><input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
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
