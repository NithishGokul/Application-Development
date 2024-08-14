import React, { useState, useContext } from 'react';
import Task from '../Components/Task';
import Progress from '../Components/Progress';
import Calendar from '../Components/Calendar';
import Profile from '../Components/Profile';
import AuthContext from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const [view, setView] = useState('task');
  const [tasks, setTasks] = useState([]);
  const { logout } = useContext(AuthContext);

  const addTaskAndRedirect = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
    setView('progress');
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
        <h2>Dashboard</h2>
        <ul>
          <li onClick={() => setView('task')}>Task</li>
          <li onClick={() => setView('progress')}>Progress</li>
          <li onClick={() => setView('calendar')}>Calendar</li>
          <li onClick={() => setView('profile')}>Profile</li>
          <li onClick={logout}>Logout</li>
        </ul>
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

export default Dashboard;
