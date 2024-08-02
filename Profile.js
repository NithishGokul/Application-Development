// src/components/Profile.js
import React from 'react';
import './Profile.css';

function Profile({ userDetails }) {
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-details">
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Username:</strong> {userDetails.username}</p>
        {/* Add more user details as needed */}
      </div>
    </div>
  );
}

export default Profile;
