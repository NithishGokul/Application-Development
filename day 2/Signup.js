// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    // Mock signup logic
    console.log('Signup:', { username, email, password, phoneNumber });
    setMessage('Signup Successful');

    const userDetails = { username, email, phoneNumber };

    // Navigate to the dashboard with the user details
    setTimeout(() => {
      navigate('/dashboard', { state: { userDetails } });
    }, 1000); // 1-second delay
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">Signup</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
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
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
          <button type="submit">Signup</button>
        </form>
        {message && <p className={`signup-message ${message === 'Signup Successful' ? 'success' : 'error'}`}>{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
