import React, { useState } from 'react';
import axios from 'axios';
import './AdopterLoginForm.css';

export interface LoginRequest {
    emailAddress: string;
    passwordHash: string;
}

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const request: LoginRequest = {emailAddress: username, passwordHash: password}
    const token = ""
    try {
      const response = await axios(
        `http://localhost:8081/api/auth`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: request
        }
      )
      console.log('Response from server:', response.data);
      setResponseMessage(response.data.message);

    } catch (err: any) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <section className="vh-100 adopter-login-form">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://i.vimeocdn.com/portrait/44052766_640x640"
              className="img-fluid"
              alt="Phone image"
              style={{ width: '200px' }}
            ></img>
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleLogin}>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-block">
                Sign in
              </button>
            </form>

            {responseMessage && <p>{responseMessage}</p>}
            {error && <p className="text-danger">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
