import React from 'react';
import './Calendar.css';

const Calendar = ({ tasks = [] }) => {
  // Create a dictionary to map dates to tasks
  const tasksByDate = tasks.reduce((acc, task) => {
    const date = new Date(task.dueDate).toDateString(); // Format date for key
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {});

  // Create an array of dates for the current month
  const getDaysInMonth = (year, month) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Render the calendar
  const renderCalendar = () => {
    const now = new Date();
    const daysInMonth = getDaysInMonth(now.getFullYear(), now.getMonth());

    return (
      <div className="calendar-grid">
        {daysInMonth.map((day, index) => {
          const dateString = day.toDateString();
          return (
            <div key={index} className="calendar-day">
              <span className="date">{day.getDate()}</span>
              {tasksByDate[dateString] && tasksByDate[dateString].map(task => (
                <div key={task.id} className="task">
                  <p>{task.name}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      {renderCalendar()}
    </div>
  );
};

export default Calendar;
