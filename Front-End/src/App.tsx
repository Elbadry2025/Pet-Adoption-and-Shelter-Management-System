import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import ShelterForm from './pages/ShelterForm';
import AdminDashBoard from './pages/AdminDashBoard';
import CheckAdoptionApplications from './pages/Staff/CheckAdoptionApplications';
import StaffPetDetailsModal from './pages/Staff/staffPetDetailsModal';
import PetDetailsModal from './pages/Client/PetDetailsModal';
import UserAdoptionsTable from './pages/UserAdoptions';
import StaffProfile from './pages/Staff/StaffProfile';
import AdopterProfile from './pages/Client/AdopterProfile';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        
        
        
        
        
        
        
        
        {/* You can add more Route components here for other paths */}
      </Routes>
    </Router>
  );
};

export default App;
