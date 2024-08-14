import React, { useState } from 'react';
import axios from 'axios';
import './Task.css';

const Task = ({ addTaskAndRedirect }) => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    priority: 'low',
    assigneeEmail: '', // Updated to match backend field
    status: 'incomplete'
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const apiUrl = 'http://127.0.0.1:8080/api/tasks'; // Your backend API URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (task.name && task.description && task.dueDate && task.assigneeEmail) { // Updated to match backend field
      try {
        const response = await axios.post(apiUrl, task, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setMessage('Task added successfully.');
        addTaskAndRedirect(response.data); // Call the callback to switch to the progress view
      } catch (error) {
        console.error(error);
        setError('An error occurred while adding the task.');
      }
    } else {
      setError('Please fill in all required fields.');
    }
  };

  return (
    <div className="task-container">
      <h2>Add Task</h2>
      <div className="form-container">
        <form className="task-form" onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            value={task.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
          <select name="priority" value={task.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="text"
            name="assigneeEmail" // Updated to match backend field
            placeholder="Assignee Email"
            value={task.assigneeEmail}
            onChange={handleChange}
          />
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="incomplete">Incomplete</option>
            <option value="in progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default Task;
