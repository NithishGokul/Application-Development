import React, { useState } from 'react';
import './Progress.css';

const Progress = ({ tasks = [], updateTaskStatus, removeTask }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtering tasks based on the filter and search term
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'all') return true;
      return task.status === filter;
    })
    .filter((task) => {
      return task.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="progress-container">
      <h2>Task Progress</h2>
      
      <div className="progress-controls">
        <input
          type="text"
          placeholder="Search by task name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="in progress">In Progress</option>
          <option value="complete">Complete</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id} className={`task-item ${task.status}`}>
              <div>
                <strong>{task.name}</strong>
                <p>{task.description}</p>
                <p>Due Date: {task.dueDate}</p>
                <p>Priority: {task.priority}</p>
                <p>Assignee: {task.assignee}</p>
                <p>Status: {task.status}</p>
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="in progress">In Progress</option>
                  <option value="complete">Complete</option>
                </select>
                <button onClick={() => removeTask(task.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Progress;
