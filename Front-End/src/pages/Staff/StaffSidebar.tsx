import React from 'react';
import { Link } from 'react-router-dom';
import './StaffSidebar.css';
import { FaTasks, FaPlusSquare, FaCat, FaUserEdit } from 'react-icons/fa';

const StaffSidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <Link className="sidebar-item" to="/adoption-applications" title="Adoption Applications"><FaTasks /><span>Adoption Applications</span></Link>
            <Link className="sidebar-item" to="/add-pet" title="Add Pet"><FaPlusSquare /><span>Add Pet</span></Link>
            <Link className="sidebar-item" to="/show-pets" title="show-pets"><FaCat /><span>Show Pets</span></Link>
            <Link className="sidebar-item" to="/Staff-Profile" title="Staff Profile"><FaUserEdit /><span>Staff Profile</span></Link>
        </div>
    );
};

export default StaffSidebar;
