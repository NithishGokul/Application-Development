// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content-wrapper">
        <h2 className="home-title">Welcome to TaskManager</h2>
        <p className="home-content">
          Manage your tasks and track your time efficiently with our easy-to-use interface.
        </p>
        <Link to="/login" className="home-button">
          Get Started!
        </Link>
      </div>
      <div className="home-grid">
        <div className="home-grid-item">
          <h3>Reduce app switching</h3>
          <p>Organize all your tasks, files, wikis, and code without switching to a different tool or breaking focus.</p>
        </div>
        <div className="home-grid-item">
          <h3>Easily analyze workflows for bottlenecks and inefficiencies</h3>
          <p>See where tasks are getting stuck in your workflow, so you can add resources, refine your process, or change requirements.</p>
        </div>
        <div className="home-grid-item">
          <h3>See all work in progress at a glance</h3>
          <p>Visual tools like Kanban-style boards, Gantt charts, and burndown charts make it easy to get a high-level view of your project at any time.</p>
        </div>
        <div className="home-grid-item">
          <h3>Get out of outdated spreadsheets</h3>
          <p>With a single source of truth, you can check in on any task at any time and get the most up-to-date information available.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
