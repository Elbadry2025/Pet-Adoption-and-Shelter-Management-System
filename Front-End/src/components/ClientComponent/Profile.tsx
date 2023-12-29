import React, { useState } from 'react';
import './Profile.css';

type UserData = {
    userId: number;
    name: string;
    emailAddress: string;
    phoneNumber: string;
    password: string;
};

const Profile: React.FC = () => {
    const initialUserData: UserData = {
        userId: 1,
        name: 'John Doe',
        emailAddress: 'john@example.com',
        phoneNumber: '123-456-7890',
        password: '',
    };

    const [userData, setUserData] = useState<UserData>(initialUserData);
    const [editableUserData, setEditableUserData] = useState<UserData>({ ...userData });
    const [isEditing, setIsEditing] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditableUserData({ ...editableUserData, [event.target.name]: event.target.value });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
      setEditableUserData({ ...userData });
      setNewPassword('');
      setConfirmPassword('');
      setIsEditing(false);
      setUpdateMessage('');
  };
  
    const handleUpdateClick = () => {
        if (newPassword === confirmPassword) {
            setUserData({ ...editableUserData, password: newPassword });
            setIsEditing(false);
            setUpdateMessage('Profile updated successfully!');
            setTimeout(() => setUpdateMessage(''), 2000); // Message disappears after 2 seconds
        } else {
            setUpdateMessage('Passwords do not match. Please try again.');
            setTimeout(() => setUpdateMessage(''), 2000); // Message disappears after 2 seconds
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>User Profile</h1>
                {!isEditing && (
                    <button className="edit-button" onClick={handleEditClick}>Edit</button>
                )}
            </div>

            {isEditing && (
                <div className="profile-info">
                    <div><input type="text" name="name" value={editableUserData.name} onChange={handleInputChange} /></div>
                    <div><input type="email" name="emailAddress" value={editableUserData.emailAddress} onChange={handleInputChange} /></div>
                    <div><input type="tel" name="phoneNumber" value={editableUserData.phoneNumber} onChange={handleInputChange} /></div>
                    <div><input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
                    <div><input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
                </div>
            )}

            {!isEditing && (
                <div className="profile-info">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email Address:</strong> {userData.emailAddress}</p>
                    <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
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

export default Profile;
