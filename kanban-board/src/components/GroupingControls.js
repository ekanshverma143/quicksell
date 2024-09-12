import React from 'react';

const GroupingControls = ({ setGrouping, setSortBy }) => {
  return (
    <div className="grouping-controls">
      <div className="control-group">
        <label>Grouping</label>
        <select onChange={(e) => setGrouping(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="control-group">
        <label>Ordering</label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default GroupingControls;
