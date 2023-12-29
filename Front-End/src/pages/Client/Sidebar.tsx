import { Link } from 'react-router-dom';
import './Sidebar.css';
import React, { useState } from 'react';
import { FaHome, FaPaw, FaEnvelopeOpenText, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <Link className="sidebar-item" to="/" title="Home"><FaHome /><span>Home</span></Link>
            <Link className="sidebar-item" to="/adopted-pets" title="Adopted Pets"><FaPaw /><span>Adopted Pets</span></Link>
            <Link className="sidebar-item" to="/adoption-requests" title="Adoption Requests"><FaEnvelopeOpenText /><span>Adoption Requests</span></Link>
            <Link className="sidebar-item" to="/profile" title="Profile"><FaUser /><span>Profile</span></Link>
            <Link className="sidebar-item" to="/logout" title="Log Out"><FaSignOutAlt /><span>Log Out</span></Link>
        </div>
    );
};

export default Sidebar;


