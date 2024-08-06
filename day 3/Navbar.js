// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">TaskManager</h1>
      <ul className="navbar-links">
        <li><Link to="/" className="navbar-button">Home</Link></li>
        <li><Link to="/login" className="navbar-button">Login</Link></li>
        <li><Link to="/signup" className="navbar-button">Signup</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
