import React from 'react';
import { useLocation } from 'react-router-dom';

const HomePageAfterAuth = () => {
    const location = useLocation();
    var token = location.state || '';

    return (
        <div>
            <h1>Welcome!</h1>
            <h1>Your token is: {token}</h1>
        </div>
    );
};

export default HomePageAfterAuth;
