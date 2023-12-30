import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../CurrentSession';

const StaffSidebar = () => {
  const navigate = useNavigate();

  const navigateToProfile = () => navigate('/StaffProfile');
  const navigateToCheckAdoptions = () => navigate('/CheckAdoptionApplications');
  const navigateToCreatePet = () => navigate('/PetManagement');
  const Logout = () => {
    logout();
    navigate('/');
  }

  const style = {
    position:'absolute' as 'absolute',
    top:'20px',
    right:'20px',   
  };



  return (
    <div style={style} >
      <button  onClick={navigateToProfile}>Profile</button>
      <button  onClick={navigateToCheckAdoptions}>Check Adoptions</button>
      <button  onClick={navigateToCreatePet}>Create Pet</button>
      <button onClick={Logout}>Logout</button>
    </div>
  );
};

export default StaffSidebar;
