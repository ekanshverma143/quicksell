import React from 'react';
import highPriorityIcon from '../assets/icons/Img-HighPriority.svg';
import mediumPriorityIcon from '../assets/icons/Img - Medium Priority.svg';
import lowPriorityIcon from '../assets/icons/Img - Low Priority.svg';
import noPriorityIcon from '../assets/icons/No-priority.svg';

const Column = ({ title, tickets }) => {
  const priorityMapping = {
    1: { label: 'High', icon: highPriorityIcon },
    2: { label: 'Medium', icon: mediumPriorityIcon },
    3: { label: 'Low', icon: lowPriorityIcon },
    0: { label: 'No Priority', icon: noPriorityIcon },
  };

  return (
    <div className="kanban-column">
      <h3>{title}</h3>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="ticket-card">
          <h4>{ticket.title}</h4>
          <div className="ticket-meta">
            <span>{ticket.status}</span>
            {ticket.priority in priorityMapping && (
              <div className="priority">
                <img
                  src={priorityMapping[ticket.priority].icon}
                  alt={priorityMapping[ticket.priority].label}
                  className="priority-icon"
                />
                <span>{priorityMapping[ticket.priority].label}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Column;
