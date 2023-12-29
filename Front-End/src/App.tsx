import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import ShelterForm from './pages/ShelterForm';
import AdminDashBoard from './pages/AdminDashBoard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-shelters" element={<ShelterForm />} />
        <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
        {/* You can add more Route components here for other paths */}
      </Routes>
    </Router>
  );
};

export default App;
