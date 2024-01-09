"use client"

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const SalesChart = () => {
  const [selectedMonth, setSelectedMonth] = useState('January'); // Default month
  const [chartData, setChartData] = useState({});

  // Sample data for food item sales
  const data = [
    {
      month: 'January',
      sales: [10, 20, 15, 25, 30],
    },
    {
      month: 'February',
      sales: [15, 25, 20, 18, 35],
    },
    // Add data for other months as needed
  ];

  useEffect(() => {
    // Find the selected month in the data array
    const selectedData = data.find((monthData) => monthData.month === selectedMonth);

    // If the selected month is found, update chart data
    if (selectedData) {
      setChartData({
        labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
        datasets: [
          {
            label: `Sales for ${selectedMonth}`,
            data: selectedData.sales,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [selectedMonth]);

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      {/* Dropdown for selecting month */}
      <select value={selectedMonth} onChange={handleChange}>
        {data.map((monthData) => (
          <option key={monthData.month} value={monthData.month}>
            {monthData.month}
          </option>
        ))}
      </select>

      {/* Bar chart component */}
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default SalesChart;
