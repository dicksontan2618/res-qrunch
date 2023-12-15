"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react';

const Home = () => {
  const [vendorData, setVendorData] = useState({
    vendor1: [
      { id: 1, name: "Margherita Pizza", type: "pizza", price: 10.99 },
      { id: 2, name: "Classic Burger", type: "burger", price: 8.99 },
    ],
    vendor2: [
      { id: 3, name: "Salmon Sushi", type: "sushi", price: 12.99 },
      { id: 3, name: "Teriyaki Bento", type: "bento", price: 18.99 },
      // Add more items for vendor2
    ],
    // Add more vendors as needed
  });

  const [cart, setCart] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    renderFoodItems();
  }, [searchTerm, filterType, selectedVendor]);

  useEffect(() => {
    renderAllFoodItems(); // Ensure this function is called when the component mounts
  }, []);

  const renderAllFoodItems = () => {
    return Object.values(vendorData).flatMap((vendorItems) =>
      vendorItems.map((food) => (
        <div key={food.id} className="food-item">
          <h3>{food.name}</h3>
          <p>{food.type}</p>
          <p>${food.price.toFixed(2)}</p>
          <button onClick={() => addToCart(food)}>Add to Cart</button>
        </div>
      ))
    );
  };

  const renderFoodItems = () => {
    const allFoodItems = Object.values(vendorData).flat();
    
    let filteredFood;
  
    if (selectedVendor === "all") {
      // If all vendors are selected, filter from all items
      filteredFood = allFoodItems;
    } else {
      // If a specific vendor is selected, filter from that vendor's items
      filteredFood = vendorData[selectedVendor] || [];
    }
  
    if (filterType.toLowerCase() !== "all") {
      // If filterType is a specific type, filter items by type
      filteredFood = filteredFood.filter(food => food.type.toLowerCase() === filterType.toLowerCase());
    }
  
    const matchesSearch = food => food.name.toLowerCase().includes(searchTerm);
    filteredFood = filteredFood.filter(matchesSearch);
  
    return filteredFood.map((food) => (
      <div key={food.id} className="food-item">
        <h3>{food.name}</h3>
        <p>{food.type}</p>
        <p>${food.price.toFixed(2)}</p>
        <button onClick={() => addToCart(food)}>Add to Cart</button>
      </div>
    ));
  };
  
  
  
  const addToCart = (food) => {
    setCart((prevCart) => [...prevCart, food]);
  };

  const updateCart = () => {
    // You can calculate the total here if needed
  };

  const saveLocation = () => {
    const userLocation = locationInput.value;
    // You can use the user's location for various purposes (e.g., filtering restaurants based on location)
    console.log("User Location:", userLocation);
  };

  return (
    <main className="">
      <header>
        <h1>Food Delivery App</h1>
      </header>

      <div className="hidden md:flex md:justify-center md:items-center md:w-screen md:h-screen ">
        <h1>Application only available in mobile view!</h1>
      </div>

      <div className="block md:hidden">
        <div id="location-section">
          <label htmlFor="location-input">Enter Your Location:</label>
          <input
            type="text"
            id="location-input"
            placeholder="E.g., Your City"
          />
          <button onClick={saveLocation}>Save Location</button>
        </div>

        <div id="vendor-section">
          <label htmlFor="vendor-select">Select Vendor:</label>
          <select
            id="vendor-select"
            onChange={(e) => setSelectedVendor(e.target.value)}
            value={selectedVendor}
          >
            <option value="all">All Vendors</option>
            <option value="vendor1">Vendor 1</option>
            <option value="vendor2">Vendor 2</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div id="search-bar">
          <input
            type="text"
            id="search-input"
            placeholder="Search for food..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <select
            id="food-filter"
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
          >
            <option value="all">All</option>
            <option value="pizza">Pizza</option>
            <option value="burger">Burger</option>
            <option value="sushi">Sushi</option>
            <option value="bento">Bento</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div id="food-list">
          {(selectedVendor === "all" && filterType === "all")? renderAllFoodItems() : renderFoodItems()}
        </div>

        <div id="shopping-cart">
          <h2>Shopping Cart</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p>
            Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;


