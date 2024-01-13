"use client"
import React, { useState } from 'react';

const DonationSummary = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const getChartForDay = (day) => {
    console.log(`/vendor/donation-summary-daily/Graph/${day}.png`)
    return `/${day}.png`;
  };

  return (
    <div>
      
      <div id="sticky-banner" tabindex="-1" class="relative top-0 start-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-white-50 dark:bg-gray-700 dark:border-gray-600 shadow-xl">
        <div class="flex justify-between mx-auto">
        <label htmlFor="monthDropdown">Select Day: </label>
          <select
            id="monthDropdown"
            value={selectedDay}
            onChange={handleDayChange}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
    </div>

      {/* Body of the Interface */}
      <div className="flex mt-20 justify-center items-center flex-col">
        <img src={getChartForDay(selectedDay)} alt={`Chart for ${selectedDay}`} />
      </div>
    </div>
  );
};

export default DonationSummary;
