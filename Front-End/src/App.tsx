import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdopterSidebar from './components/ClientComponent/Sidebar';
import StaffSidebar from './components/StaffComponent/StaffSidebar';
import Home from './components/ClientComponent/Home';
import AdoptedPets from './components/ClientComponent/AdoptedPets';
import AdoptionRequests from './components/ClientComponent/AdoptionRequests';
import Profile from './components/ClientComponent/Profile';
import CheckAdoptionApplications from './components/StaffComponent/CheckAdoptionApplications';
import AddPet from './components/StaffComponent/AddPet';
import ShowPets from './components/StaffComponent/ShowPets';
import StaffProfile from './components/StaffComponent/StaffProfile';
import './App.css';

const App: React.FC = () => {
  const isStaff = true; 

  return (
    <Router>
      <div className="app-container">
        {isStaff ? <StaffSidebar /> : <AdopterSidebar />}
        <div className="content">
          <Routes>
            
            {!isStaff && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/adopted-pets" element={<AdoptedPets />} />
                <Route path="/adoption-requests" element={<AdoptionRequests />} />
                <Route path="/profile" element={<Profile />} />
              </>
            )}

            {isStaff && (
              <>
                <Route path="/adoption-applications" element={<CheckAdoptionApplications />} />
                <Route path="/add-pet" element={<AddPet />} />
                <Route path="/show-pets" element={<ShowPets />} />
                <Route path="/Staff-Profile" element={<StaffProfile />} />
              </>
            )}

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

