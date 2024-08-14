import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  return (
    <div className="task-item">
      <h3>{task.task}</h3>
      <p>{task.description}</p>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${task.progress}%` }}
        ></div>
      </div>
      <span>{task.progress}%</span>
    </div>
  );
};

export default TaskItem;
