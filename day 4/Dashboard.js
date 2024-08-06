// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Profile from './Profile';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    status: 'Not Started',
    description: '',
    dueDate: '',
    priority: 'Normal',
    assignedTo: ''
  });
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('status');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve user details passed from Login
  const userDetails = location.state?.userDetails || {
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe'
  };

  useEffect(() => {
    // Set the active tab to 'profile' if userDetails are passed from Login
    if (location.state?.userDetails) {
      setActiveTab('profile');
    } else {
      // Get the tab from query parameters
      const params = new URLSearchParams(location.search);
      const tab = params.get('tab');
      if (tab) {
        setActiveTab(tab);
      }
    }
  }, [location.state, location.search]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      tasks.forEach(task => {
        if (new Date(task.dueDate) < now && task.status !== 'Completed') {
          alert(`Task "${task.title}" is overdue!`);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.dueDate) {
      setTasks([...tasks, { ...newTask }]);
      setNewTask({
        title: '',
        status: 'Not Started',
        description: '',
        dueDate: '',
        priority: 'Normal',
        assignedTo: ''
      });
      setActiveTab('status');
    }
  };

  const handleUpdateTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...newTask } : task
    );
    setTasks(updatedTasks);
    setEditingTaskIndex(null);
    setNewTask({
      title: '',
      status: 'Not Started',
      description: '',
      dueDate: '',
      priority: 'Normal',
      assignedTo: ''
    });
    setActiveTab('status');
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditingTask = (index) => {
    setEditingTaskIndex(index);
    setNewTask(tasks[index]);
    setActiveTab('add');
  };

  const cancelEditing = () => {
    setEditingTaskIndex(null);
    setNewTask({
      title: '',
      status: 'Not Started',
      description: '',
      dueDate: '',
      priority: 'Normal',
      assignedTo: ''
    });
    setActiveTab('status');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayOfMonth = new Date(currentYear, currentMonth, daysInMonth).getDay();

    const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => daysInMonth - i).reverse();
    const nextMonthDays = Array.from({ length: 6 - lastDayOfMonth }, (_, i) => i + 1);
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)}>Previous</button>
          <h2>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={() => setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)}>Next</button>
        </div>
        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
          {allDays.map((day, index) => {
            const date = new Date(currentYear, currentMonth, day - prevMonthDays.length);
            const isCurrentMonth = index >= prevMonthDays.length && index < prevMonthDays.length + daysInMonth;
            const dayTasks = tasks.filter(task => new Date(task.dueDate).toDateString() === date.toDateString());

            return (
              <div key={index} className={`calendar-day ${isCurrentMonth ? '' : 'calendar-day-disabled'}`}>
                <span>{day}</span>
                {isCurrentMonth && (
                  <ul>
                    {dayTasks.map((task, i) => (
                      <li key={i}>{task.title}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderReminders = () => {
    const now = new Date();
    return (
      <div className="reminders">
        <h2>Reminders</h2>
        <ul>
          {tasks.map((task, index) => {
            const dueDate = new Date(task.dueDate);
            const daysLeft = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
            return (
              <li key={index}>
                {task.title} - {daysLeft > 0 ? `${daysLeft} days left` : `Overdue!`}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const renderTaskPrioritization = () => {
    const sortedTasks = tasks.sort((a, b) => a.priority.localeCompare(b.priority));
    return (
      <div className="task-prioritization">
        <h2>Task Prioritization</h2>
        <ul>
          {sortedTasks.map((task, index) => (
            <li key={index}>
              {task.title} - {task.priority}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderTaskAssignment = () => {
    return (
      <div className="task-assignment">
        <h2>Task Assignment</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.title} - {task.assignedTo || 'Unassigned'}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderTaskProgressTracking = () => {
    return (
      <div className="task-progress-tracking">
        <h2>Task Progress Tracking</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.title} - {task.status}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-title">Dashboard</div>
        <button onClick={() => setActiveTab('add')}>Add Task</button>
        <button onClick={() => setActiveTab('calendar')}>Calendar</button>
        <button onClick={() => setActiveTab('prioritization')}>Task Prioritization</button>
        <button onClick={() => setActiveTab('assignment')}>Task Assignment</button>
        <button onClick={() => setActiveTab('tracking')}>Task Progress Tracking</button>
        <button onClick={() => setActiveTab('reminders')}>Reminders</button>
        <button onClick={() => setActiveTab('profile')}>Profile</button> {/* Profile Tab */}
        <button onClick={() => setActiveTab('status')}>Task List</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        {activeTab === 'add' && (
          <div className="task-input">
            <h2>Add Task</h2>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Task Title"
            />
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Task Description"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
            <input
              type="text"
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              placeholder="Assigned To"
            />
            {editingTaskIndex !== null ? (
              <div>
                <button onClick={() => handleUpdateTask(editingTaskIndex)}>Update Task</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <button onClick={handleAddTask}>Add Task</button>
            )}
          </div>
        )}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'prioritization' && renderTaskPrioritization()}
        {activeTab === 'assignment' && renderTaskAssignment()}
        {activeTab === 'tracking' && renderTaskProgressTracking()}
        {activeTab === 'reminders' && renderReminders()}
        {activeTab === 'profile' && <Profile userDetails={userDetails} />} {/* Render Profile */}
        {activeTab === 'status' && (
          <div className="task-list">
            <h2>Task List</h2>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>
                  <div>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                    <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    <p>Status: {task.status}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Assigned To: {task.assignedTo || 'Unassigned'}</p>
                    <button onClick={() => startEditingTask(index)}>Edit</button>
                    <button onClick={() => handleDeleteTask(index)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
