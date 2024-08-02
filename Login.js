// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login validation for demonstration purposes
    if (email === 'ng@gmail.com' && password === '3030') {
      setMessage('Login Successful');
      const userDetails = {
        email,
        username
      };
      // Navigate to the dashboard page with the userDetails in the state
      setTimeout(() => {
        navigate('/dashboard', { state: { userDetails } });
      }, 1000); // 1-second delay
    } else {
      setMessage('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        {message && <p className={`login-message ${message === 'Login Successful' ? 'success' : 'error'}`}>{message}</p>}
        <div className="signup-prompt">
          <p>Don't have an account? <a href="/signup" className="signup-button">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
