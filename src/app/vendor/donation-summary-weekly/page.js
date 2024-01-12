"use client"
import React, { useState } from 'react';

const DonationSummary = () => {
  const [selectedWeek, setSelectedWeek] = useState('January');
  const [selectedItem, setSelectedItem] = useState('Overall');

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const getChartForWeek = (week, item) => {
    if(item == "WeekTotal"){
      return `src/app/vendor/donation-summary-weekly/Graph/WeekTotal${week}.png`;
    }
    return `src/app/vendor/donation-summary-weekly/Graph/${item}`;
  };

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <div>
      <div id="sticky-banner" tabindex="-1" class="relative top-0 start-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-white-50 dark:bg-gray-700 dark:border-gray-600 shadow-xl">
        <div class="flex justify-between mx-auto">
        <label htmlFor="monthDropdown">Select Week: </label>
          <select
            id="monthDropdown"
            value={selectedWeek}
            onChange={handleWeekChange}
          >
            <option value="1">7/1/2024 - 13/1/2024</option>
            <option value="2">14/1/2024 - 20/1/2024</option>
            <option value="3">21/1/2024 - 27/1/2024</option>
            <option value="4">28/1/2024 - 3/2/2024</option>
          </select>

          <label htmlFor="foodVariation">Select Menu Items: </label>
          <select
            id="monthDropdown"
            value={selectedItem}
            onChange={handleItemChange}
          >
            <option value="WeekTotal">Overall</option>
            <option value="Week-BeefBurger">Beef Burger</option>
            <option value="Week-ChickenSalad">Chicken Salad</option>
            <option value="Week-FriedChicken">Fried Chicken</option>
            <option value="Week-CaesarSalad">Caesar Salas</option>
            <option value="Week-PepperoniPizza">Pepperoni Pizza</option>
            <option value="Week-BubbleMilkTea">Bubble Milk Tea</option>
            <option value="Week-ChickenBurger">Chicken Burger</option>
            <option value="Week-NasiLemak">Nasi Lemak</option>
          </select>
        </div>
    </div>

      {/* Body of the Interface */}
      <div className="body">
        <img src={getChartForWeek(selectedWeek, selectedItem)} alt={`Chart for ${selectedWeek}`} />
      </div>
    </div>
  );
};

export default DonationSummary;
