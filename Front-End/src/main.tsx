import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App'
import './index.css'
import AdopterLogin from './pages/AdopterLogin'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdopterSignup from './pages/AdopterSignup';
import StaffLogin from './pages/StaffLogin';
import StaffSignup from './pages/StaffSignup';
import HomePage from './pages/HomePage';
import HomePageAfterAuth from './pages/HomePageAfterAuth';
import AdopterProfile from './pages/Client/AdopterProfile';
import StaffProfile from './pages/Staff/StaffProfile';
import UserAdoptionsTable from './pages/UserAdoptions';
import PetDetailsModal from './pages/Client/PetDetailsModal';
import CheckAdoptionApplications from './pages/Staff/CheckAdoptionApplications';
import AdminDashBoard from './pages/AdminDashBoard';
import ShelterForm from './pages/ShelterForm';
import PetManagement from './pages/PetManagement';

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/AdopterLogin",
    element: <AdopterLogin />,
  },
  {
    path: "/StaffLogin",
    element: <StaffLogin />,
  },
  {
    path: "/AdopterSignup",
    element: <AdopterSignup />,
  },
  {
    path: "/StaffSignup",
    element: <StaffSignup />,
  },
 
  {
    path: "/AdopterProfile",
    element: <AdopterProfile />,
  },
  {
    path:'/StaffProfile',
    element: <StaffProfile />,
  },
  {
    path:'/UserAdoptionsTable',
    element: <UserAdoptionsTable />,
  },
  {
    path:'/PetDetailsModal',
    element: <PetDetailsModal />,
  },
  {
    path:"/CheckAdoptionApplications",
    element: <CheckAdoptionApplications/>,
  },
  {
    path:"/AdminDashBoard",
    element: <AdminDashBoard/>,
  },
  {
    path:"/create-shelters",
    element: <ShelterForm/>,
  },
  {
    path: "/PetManagement",
    element: <PetManagement/>,
  },
 
  {
    path: "*",
    element: <h1>404</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    
    <RouterProvider router={router} />
  </React.StrictMode>
)
