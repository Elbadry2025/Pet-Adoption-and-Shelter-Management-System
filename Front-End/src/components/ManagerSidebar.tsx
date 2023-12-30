import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../CurrentSession';

const ManagerSidebar = () => {
  const navigate = useNavigate();

  const create_shelter = () => navigate('/create-shelters');
  const DashBoard = () => navigate('/AdminDashBoard');
  const Logout = () => {
    logout();
    navigate('/');
  }
  const style = {
    position:'absolute' as 'absolute',
    top:'20px',
  };




  return (
    <div style={style}>
      <button  onClick={create_shelter}>Create Shelter</button>
      <button  onClick={DashBoard}>DashBoard</button>
      <button onClick={Logout}>Logout</button>
      
    </div>
  );
};

export default ManagerSidebar;
