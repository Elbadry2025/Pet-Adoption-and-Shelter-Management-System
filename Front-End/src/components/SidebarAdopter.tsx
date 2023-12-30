import React from 'react';
import { useNavigate } from 'react-router-dom';
import{logout} from '../CurrentSession'

const Sidebar = () => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate('/AdopterProfile');
  };

  const navigateToAdoptionsTable = () => {
    navigate('/UserAdoptionsTable');
  };

  const navigateToBrowsePets = () => {
    navigate('/PetDetailsModal');
  };

  const Logout = () => {
    logout();
    navigate('/');
  }
  
  return (
    <div className="sidebar">
      <button onClick={navigateToProfile}>Profile</button>
      <button onClick={navigateToAdoptionsTable}>Adoptions Table</button>
      <button onClick={navigateToBrowsePets}>Browse Pets</button>
      <button onClick={Logout}>Logout</button>
    </div>
  );
};

export default Sidebar;