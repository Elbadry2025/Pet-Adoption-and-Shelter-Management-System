import React, { useState } from 'react';
import axios from 'axios';
import './AdopterLoginForm.css';
import { useNavigate } from 'react-router-dom';

export interface LoginRequest {
    emailAddress: string;
    passwordHash: string;
}

export interface Response {
  token: string;
}

const AdopterLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate('/AdopterSignup');
  }

  const goToAdoptions = (response: Response) => {
    navigate('/useradoptionstable', {
        state: response.token
    });
  }

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const request: LoginRequest = {emailAddress: username, passwordHash: password}
    try {
      const response = await axios(
        `http://localhost:8081/api/auth/authenticateAdopter`,
        {
            method: 'POST',
            data: request
        }
      )
      console.log('Response from server:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('userId', response.data.userId);
      goToAdoptions(response.data);
    } catch (err: any) {
      alert("User not found.")
    }
  };

  return (
    <section className="vh-100 adopter-login-form">
      <div className="container py-5 h-100">
      <h1 style={{ position: 'absolute', top: '150px' }}>Adopters Login</h1>
        <div className="row d-flex align-items-center justify-content-center h-100">
        <div className="col-md-5 col-lg-4 col-xl-4">
            <img
                src="https://i.vimeocdn.com/portrait/44052766_640x640"
                className="img-fluid"
                alt="Phone image"
                style={{ width: '200px' }}
            />
          </div>
          <div className="col-md-7 col-lg-8 col-xl-16">
            <form onSubmit={handleLogin}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-success btn-lg btn-block">
                Login
              </button>
              <button className="btn btn-secondary btn-lg btn-block" style={{ position: 'relative', left: '9%' }} onClick={goToSignup}>
                First time? Register now!
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AdopterLoginForm;
