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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-shelters" element={<ShelterForm />} />
        <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
        <Route path="/CheckAdoptionApplications" element={<CheckAdoptionApplications />} />
        <Route path='/StaffPetDetailsModal' element={<StaffPetDetailsModal />} />
        <Route path='/PetDetailsModal' element={<PetDetailsModal />} />
        {/* You can add more Route components here for other paths */}
      </Routes>
    </Router>
  );
};

export default App;
