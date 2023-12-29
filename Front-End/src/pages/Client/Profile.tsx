import React, { useState, useEffect } from 'react';
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
        name: '',
        emailAddress: '',
        phoneNumber: '',
        password: '',
    };

    const [userData, setUserData] = useState<UserData>(initialUserData);
    const [editableUserData, setEditableUserData] = useState<UserData>({ ...userData });
    const [isEditing, setIsEditing] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');

    //APIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    useEffect(() => {
        // Fetch user data from backend endpoint
        const fetchUserData = async () => {
            try {
                const response = await fetch('YOUR_BACKEND_ENDPOINT'); // Replace with your endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userDataFromBackend: UserData = await response.json();
                setUserData(userDataFromBackend);
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error state or alert the user
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditableUserData({ ...editableUserData, [event.target.name]: event.target.value });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setEditableUserData({ ...userData });
        setIsEditing(false);
    };


    //APIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    const handleUpdateClick = async () => {
        try {
            // Send updated user data to the backend for update
            const response = await fetch('YOUR_BACKEND_UPDATE_ENDPOINT', {
                method: 'PUT', // Adjust the HTTP method as per your backend API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editableUserData),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            setUserData({ ...editableUserData });
            setIsEditing(false);
            setUpdateMessage('Profile updated successfully!');
            setTimeout(() => setUpdateMessage(''), 2000);
        } catch (error) {
            console.error('Error updating profile:', error);
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

/*import React, { useState } from 'react';
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
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditableUserData({ ...editableUserData, [event.target.name]: event.target.value });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setEditableUserData({ ...userData });
        setIsEditing(false);
    };

    const handleUpdateClick = () => {
        setUserData({ ...editableUserData });
        setIsEditing(false);
        setUpdateMessage('Profile updated successfully!');
        setTimeout(() => setUpdateMessage(''), 2000);
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
*/