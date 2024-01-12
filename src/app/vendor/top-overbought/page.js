"use client"
import React, { useState } from 'react';

const OverboughtChart = () => {
  const [selectedMonth, setSelectedMonth] = useState('January');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const getChartForMonth = (month) => {
    // Implement logic to get the corresponding image for the month
    // For now, using a placeholder URL
    return `https://placeholder.com/${month}`;
  };

  return (
    <div>
      {/* Upper Taskbar */}
      <div className="p-15 items-center">
        <label htmlFor="monthDropdown">Select Month: </label>
        <select
          id="monthDropdown"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      {/* Body of the Interface */}
      <div className="body">
        <img src={getChartForMonth(selectedMonth)} alt={`Chart for ${selectedMonth}`} />
      </div>
    </div>
  );
};

export default OverboughtChart;
