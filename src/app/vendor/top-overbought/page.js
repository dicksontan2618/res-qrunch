"use client"
import React, { useState } from 'react';

const DonationSummary = () => {
  const [selectedMonth, setSelectedMonth] = useState('WeekTotal1');
  var selectedItem = "Chicken Burger";

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const getChartForMonth = (month) => {
    var link = "/" + month + ".png";
    return link;
  };

  const getItem = (month) => {
    if(month == "WeekTotal1"){
      selectedItem = "Chicken Burger";
    }else if(month == "WeekTotal4"){
      selectedItem = "Beef Burger";
    }else if(month == "WeekTotal3"){
      selectedItem = "Fried Chicken & Bubble Milk Tea";
    }else if(month == "WeekTotal2"){
      selectedItem = "Chicken Burger";
    }
    return selectedItem;
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
            <option value="WeekTotal1">October 2023</option>
            <option value="WeekTotal2">November 2023</option>
            <option value="WeekTotal3">December 2023</option>
            <option value="WeekTotal4">January 2024</option>
          </select>
        </div>
    </div>

      {/* Body of the Interface */}
      <div className="flex justify-center items-center flex-col">
        <h2 className="mt-6 mb-3 font-medium text-center">Most Overbought</h2>
        <h3 className="mb-5 font-semibold text-red-500 bg-pink-100 p-2 rounded">{getItem(selectedMonth)}</h3>
        <img src={getChartForMonth(selectedMonth)} alt={`Chart for ${selectedMonth}`} />
      </div>
    </div>
  );
};

export default DonationSummary;