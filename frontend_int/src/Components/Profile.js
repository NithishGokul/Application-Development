import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const apiUrl = `http://127.0.0.1:8080/api/users/${encodeURIComponent(user.email)}`;

  useEffect(() => {
    axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setProfileData(response.data);
    })
    .catch(error => {
      console.error(error);
      setError('Failed to fetch profile data.');
    });
  }, [apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await axios.put(apiUrl, profileData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('Profile updated successfully.');
    } catch (error) {
      console.error(error);
      setError('Failed to update profile.');
    }
  };

  const handleDelete = async () => {
    setError('');
    setMessage('');

    try {
      await axios.delete(apiUrl, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('Profile deleted successfully.');
      logout(); // Log out the user
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error(error);
      setError('Failed to delete profile.');
    }
  };

  return (
    <div className="profile-container">
      <form className="profile-form" onSubmit={handleUpdate}>
        <h2>Profile</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={profileData.username}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
        <button type="button" onClick={handleDelete} className="delete-button">Delete Account</button>
      </form>
    </div>
  );
};

export default Profile;
