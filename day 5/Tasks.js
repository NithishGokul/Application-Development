// src/components/Tasks.js
import React, { useState } from 'react';
import './Tasks.css';
import TaskForm from './TaskForm';

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="tasks-container">
      <h2 className="tasks-title">Tasks</h2>
      <TaskForm addTask={addTask} />
      <ul className="tasks-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <span className="task-name">{task.name}</span>
            <span className={`task-status ${task.status.toLowerCase().replace(' ', '-')}`}>
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
