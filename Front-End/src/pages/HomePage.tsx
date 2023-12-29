import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const goToAdopterLogin = () => {
        navigate('/AdopterLogin');
    };

    const goToStaffLogin = () => {
        navigate('/StaffLogin');
    };

    return (
        <>
          <h1 style={{ margin: '50px', color: 'orange' }}>Welcome to Our Pet Shelter</h1>
          <div className="homepage-background">
            <button onClick={goToAdopterLogin} className="btn-adopter">Adopter</button>
            <button onClick={goToStaffLogin} className="btn-staff">Staff Member</button>
          </div>
        </>
    );
};

export default HomePage;
