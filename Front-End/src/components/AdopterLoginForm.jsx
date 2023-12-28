import React, { useState } from 'react';
import './AdopterLoginForm.css'

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // Add login logic here
        console.log('Logging in with:', username, password);
    };

    return (
        <div className='adpoter-login-form'>
            <form onSubmit={handleLogin} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                width: '300px',
                padding: '20px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '5px'
            }}>
                <h2 style={{ textAlign: 'center' }}>Pet Shelter Login</h2>
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: '10px', padding: '10px', fontSize: '16px', width: '100%' }}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '20px', padding: '10px', fontSize: '16px', width: '100%' }}
                />
                <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', width: '100%' }}>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
