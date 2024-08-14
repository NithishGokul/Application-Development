import React, { useState, useContext, useEffect } from 'react';
import Task from '../Components/Task';
import Progress from '../Components/Progress';
import Calendar from '../Components/Calendar';
import Profile from '../Components/Profile';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import './Dashboard.css';

const LeaderDashboard = () => {
  const [view, setView] = useState('profile');
  const [tasks, setTasks] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    // Fetch all tasks or relevant tasks for the leader
    axios.get('http://127.0.0.1:8080/api/tasks', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => setTasks(response.data))
    .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTaskAndRedirect = async (task) => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/api/tasks', task, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setTasks([...tasks, response.data]); // Add the task to state
      setView('progress'); // Switch to progress view
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTaskStatus = (taskId, status) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status } : task));
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Leader Dashboard</h2>
        <ul>
          <li onClick={() => setView('task')}>Task</li>
          <li onClick={() => setView('progress')}>Progress</li>
          <li onClick={() => setView('calendar')}>Calendar</li>
          <li onClick={() => setView('profile')}>Profile</li>
        </ul>
        <div className="bottom-menu">
      <button onClick={logout}>Logout</button>
    </div>
      </div>
      <div className="content">
        {view === 'task' && <Task addTaskAndRedirect={addTaskAndRedirect} />}
        {view === 'progress' && <Progress tasks={tasks} updateTaskStatus={updateTaskStatus} removeTask={removeTask} />}
        {view === 'calendar' && <Calendar tasks={tasks} />}
        {view === 'profile' && <Profile />}
      </div>
    </div>
  );
};

export default LeaderDashboard;
