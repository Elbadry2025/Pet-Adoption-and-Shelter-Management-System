import React, { useState } from 'react';
import axios from 'axios';
import './StaffLoginForm.css';
import { useNavigate } from 'react-router-dom';

export interface StaffRegisterRequest {
    name: string;
    emailAddress: string;
    passwordHash: string;
    phoneNumber: string;
    role: string;
}

export interface Response {
    token: string;
}

const StaffSignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/StaffLogin');
  }

  const goToAdoptions = (response: Response) => {
    navigate('/CheckAdoptionApplications', {
        state: response.token
    });
  }

  const handleSignup = async (event: any) => {
    event.preventDefault();
    if (password != confirmPassword) {
        alert("Provided passwords don't match.");
        return;
    }
    if (name.length == 0 || password.length == 0 || phone.length == 0 || username.length == 0) {
        alert("Please fill all the fields.");
        return;
    }
    const request: StaffRegisterRequest = {name: name, emailAddress: username, passwordHash: password, phoneNumber: phone,
                                            role: 'Staff Member'}
    try {
      const response = await axios(
        `http://localhost:8081/api/auth/staffRegister`,
        {
            method: 'POST',
            data: request
        }
      )
      console.log('Response from server:', response.data.token);
      if (response.data.token == 'Already Exist') {
        alert('User already exists');
      } else if (response.data.token == 'Shelter not found') {
        alert('No such shelter with the provided ID exists.');
      }
      else {
        goToAdoptions(response.data);
      }

    } catch (err: any) {
      alert('An error occurred, please try again later.');
    }
  };

  return (
    <section className="vh-100 staff-login-form">
      <div className="container py-5 h-100">
      <h1 style={{ position: 'absolute', top: '100px', left: '-10px' }}>Staff Signup</h1>

        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-5 col-lg-4 col-xl-4">
            <img
                src="https://th.bing.com/th/id/OIP.Qqm_SXK3GJxZZkeBPETu7wAAAA?rs=1&pid=ImgDetMain"
                className="img-fluid"
                alt="Phone image"
                style={{ width: '200px' }}
            />
          </div>
          <div className="col-md-7 col-lg-8 col-xl-16">
            <form onSubmit={handleSignup}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                    Name
                </label>
                <input
                    type="text"
                    className="form-control form-control-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
              </div>

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

              <div className="row">
                <div className="col-md-6 form-outline mb-4">
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

                <div className="col-md-6 form-outline mb-4">
                    <label className="form-label" htmlFor="form1Example24">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example23">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-success btn-lg btn-block" style={{ position: 'relative' }}>
                Register
              </button>
              <button className="btn btn-secondary btn-lg btn-block" style={{ position: 'relative', left: '16%' }} onClick={goToLogin}>
                Already registered? Login now!
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffSignupForm;
