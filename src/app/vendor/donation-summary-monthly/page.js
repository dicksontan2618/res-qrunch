"use client"
import React, { useState } from 'react';

const DonationSummary = () => {
  const [selectedMonth, setSelectedMonth] = useState('Month1');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const getChartForMonth = (month) => {
    return `/${month}.png`;
  };

  return (
    <div>
      <div id="sticky-banner" tabindex="-1" class="relative top-0 start-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-white-50 dark:bg-gray-700 dark:border-gray-600 shadow-xl">
        <div class="flex justify-between mx-auto">
        <label htmlFor="monthDropdown">Select Month: </label>
          <select
            id="monthDropdown"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="Month1">October 2023</option>
            <option value="Month2">November 2023</option>
            <option value="Month3">December 2023</option>
            <option value="Month4">January 2024</option>
          </select>
        </div>
    </div>

      {/* Body of the Interface */}
      <div className="flex mt-10 justify-center items-center flex-col">
        <img src={getChartForMonth(selectedMonth)} alt={`Chart for ${selectedMonth}`} />
      </div>
    </div>
  );
};

export default DonationSummary;
