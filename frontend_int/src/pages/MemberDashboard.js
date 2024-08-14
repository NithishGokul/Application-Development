import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import MemberProgress from '../Components/MemberProgress';
import Calendar from '../Components/Calendar';
import Profile from '../Components/Profile';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const MemberDashboard = () => {
  const [view, setView] = useState('progress');
  const [tasks, setTasks] = useState([]);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      // Fetch tasks assigned to the member from the API
      axios.get(`http://localhost:8080/api/tasks/assignee/${encodeURIComponent(user.email)}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [user.email]);

  const updateTaskStatus = (taskId, status) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status } : task));
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleLogout = () => {
    logout(); // Log out the user
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Member Dashboard</h2>
        <ul>
          <li onClick={() => setView('progress')}>Assigned Tasks</li>
          <li onClick={() => setView('calendar')}>Calendar</li>
          <li onClick={() => setView('profile')}>Profile</li>
        </ul>
        <div className="bottom-menu">
      <button onClick={logout}>Logout</button>
    </div>
      </div>
      <div className="content">
        {view === 'progress' && <MemberProgress tasks={tasks} updateTaskStatus={updateTaskStatus} removeTask={removeTask} />}
        {view === 'calendar' && <Calendar tasks={tasks} />}
        {view === 'profile' && <Profile />}
      </div>
    </div>
  );
};

export default MemberDashboard;
