"use client"

import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ShoppingCart from './components/ShoppingCart';

const Home = () => {
  const [vendorData, setVendorData] = useState({
    vendor1: [
      { id: 1, name: "Margherita Pizza", type: "pizza", price: 10.99 },
      { id: 2, name: "Classic Burger", type: "burger", price: 8.99 },
    ],
    vendor2: [
      { id: 3, name: "Salmon Sushi", type: "sushi", price: 12.99 },
      { id: 4, name: "Teriyaki Bento", type: "bento", price: 18.99 },
      // Add more items for vendor2
    ],
    // Add more vendors as needed
  });

  const [cart, setCart] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showCart, setShowCart] = useState(false);

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
  
    // Filter based on selected vendor
    let filteredFood =
      selectedVendor === "all" ? allFoodItems : vendorData[selectedVendor] || [];
  
    // Filter based on food type
    if (filterType.toLowerCase() !== "all") {
      filteredFood = filteredFood.filter(
        (food) => food.type.toLowerCase() === filterType.toLowerCase()
      );
    }
  
    // Add a search filter
    const matchesSearch = (food) => {
      const vendorMatches = Object.keys(vendorData).some((vendor) =>
        vendor.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const foodMatches = food.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return vendorMatches || foodMatches;
    };
  
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
    // Check if the item is already in the cart
    const existingItem = cart.find((item) => item.id === food.id);
  
    if (existingItem) {
      // If the item is already in the cart, update its quantity
      const updatedCart = cart.map((item) =>
        item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it with quantity set to 1
      setCart((prevCart) => [...prevCart, { ...food, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    // If the new quantity is less than or equal to 0, remove the item from the cart
    if (newQuantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    } else {
      // Find the item in the cart and update its quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (itemId) => {
    // Remove the item from the cart
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
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
          {(selectedVendor === "all" && filterType === "all" && searchTerm == null)? renderAllFoodItems() : renderFoodItems()}
        </div>

        <div id="shopping-cart">
        <ShoppingCart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
        </div>

        <div id="bottom-menu">
          <Link href="/page">Home</Link>
          <Link href="/pages/shopping-cart">Cart</Link>
          <Link href="/pages/profile">Profile</Link>
        </div>
      </div>
    </main>
  );
};

export default Home;