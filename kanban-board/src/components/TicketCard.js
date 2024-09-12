import React from 'react';
import './KanbanBoard.css';

// Import priority icons
import highPriorityIcon from '../assets/icons/Img-HighPriority.svg';
import mediumPriorityIcon from '../assets/icons/Img - Medium Priority.svg';
import lowPriorityIcon from '../assets/icons/Img - Low Priority.svg';
import noPriorityIcon from '../assets/icons/No-priority.svg';
import urgentPriorityIcon from '../assets/icons/SVG - Urgent Priority colour.svg';

const TicketCard = ({ ticket }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return urgentPriorityIcon;
      case 3:
        return highPriorityIcon;
      case 2:
        return mediumPriorityIcon;
      case 1:
        return lowPriorityIcon;
      case 0:
      default:
        return noPriorityIcon;
    }
  };

  return (
    <div className="ticket-card">
      <h4>{ticket.title}</h4>
      <p>{ticket.description}</p>
      <div className="ticket-meta">
        <img src={getPriorityIcon(ticket.priority)} alt="Priority" />
        <span>{ticket.status}</span>
      </div>
    </div>
  );
};

export default TicketCard;
