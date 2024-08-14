import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || !description) return;
    addTask({ task, description, progress });
    setTask('');
    setDescription('');
    setProgress(0);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="number"
        placeholder="Progress (%)"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        min="0"
        max="100"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;