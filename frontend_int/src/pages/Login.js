import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const apiUrl = "http://127.0.0.1:8080/api/auth/authenticate";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = formData;

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(apiUrl, formData);
      console.log(response);

      // Assuming the server returns a role field and a token
      const { token, role, username } = response.data;

      // Save the token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Update AuthContext with the user's data
      login({ email, role, username });

      // Redirect based on role
      if (role === 'ADMIN') {
        navigate('/leader-dashboard');
      } else if (role === 'USER') {
        navigate('/member-dashboard');
      } else {
        setError('Invalid role.');
      }

    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className='login-button' type="submit">Login</button>
        <div className="signup-redirect">
          <p>Don't have an account?</p>
          <button className='signup-button' type="button" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Login;