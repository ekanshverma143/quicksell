import React, { useState, useEffect } from 'react';
import './KanbanBoard.css';
import Column from './Column';

// Importing icons
import addIcon from '../assets/icons/add.svg';
import displayIcon from '../assets/icons/Display.svg';
import highPriorityIcon from '../assets/icons/Img-HighPriority.svg';
import mediumPriorityIcon from '../assets/icons/Img - Medium Priority.svg';
import lowPriorityIcon from '../assets/icons/Img - Low Priority.svg';
import noPriorityIcon from '../assets/icons/No-priority.svg';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);  
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');
  const [displayDropdownVisible, setDisplayDropdownVisible] = useState(false);

  useEffect(() => {
   
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setTickets(data);
        } else if (data.tickets) {
          setTickets(data.tickets);
        }
      })
      .catch((error) => console.error('Error fetching tickets:', error));
  }, []);

  const toggleDisplayDropdown = () => {
    setDisplayDropdownVisible(!displayDropdownVisible);
  };

  const priorityMapping = {
    1: { label: 'High', icon: highPriorityIcon },
    2: { label: 'Medium', icon: mediumPriorityIcon },
    3: { label: 'Low', icon: lowPriorityIcon },
    0: { label: 'No Priority', icon: noPriorityIcon },
  };

  const sortTickets = (tickets) => {
    const sorted = [...tickets];
    if (ordering === 'priority') {
      return sorted.sort((a, b) => a.priority - b.priority);
    }
    if (ordering === 'title') {
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  };

  const groupTickets = (tickets) => {
    if (grouping === 'status') {
      return tickets.reduce((acc, ticket) => {
        (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'user') {
      return tickets.reduce((acc, ticket) => {
        (acc[ticket.user] = acc[ticket.user] || []).push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'priority') {
      return tickets.reduce((acc, ticket) => {
        (acc[ticket.priority] = acc[ticket.priority] || []).push(ticket);
        return acc;
      }, {});
    }
  };

  const sortedTickets = sortTickets(tickets);
  const groupedTickets = groupTickets(sortedTickets);

  return (
    <div className="kanban-board">
      <div className="kanban-controls">
        <div className="dropdown">
          <button className="dropdown-button" onClick={toggleDisplayDropdown}>
            <img src={displayIcon} alt="Display" />
            Display
          </button>
          {displayDropdownVisible && (
            <div className="dropdown-content">
              <label>Grouping:</label>
              <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>

              <label>Ordering:</label>
              <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          )}
        </div>
        <button>
          <img src={addIcon} alt="Add" />
          Add
        </button>
      </div>

      <div className="kanban-columns">
        {Object.keys(groupedTickets).map((group) => (
          <Column key={group} title={group} tickets={groupedTickets[group]} />
        ))}
      </div>
    </div>
  );
};


export default KanbanBoard;
