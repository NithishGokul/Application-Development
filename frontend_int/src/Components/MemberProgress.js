import React from 'react';
import './MemberProgress.css'; // Add this file for styling if needed

const MemberProgress = ({ tasks, updateTaskStatus, removeTask }) => {
  return (
    <div className="member-progress-container">
      <h3>Assigned Tasks</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <h4>{task.name}</h4>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => updateTaskStatus(task.id, 'Completed')}>Complete</button>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberProgress;
