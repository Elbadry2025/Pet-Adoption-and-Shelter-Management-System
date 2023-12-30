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
import Backup from './pages/Backup';

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
    path: "/home",
    element: <HomePageAfterAuth />,
  },
  {
    path: "/backup",
    element: <Backup />,
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
