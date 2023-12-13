"use client"

import Image from 'next/image'
import { useEffect } from 'react';


export default function Home() {

  useEffect(() => {
    const vendorData = {
      vendor1: [
        { id: 1, name: "Margherita Pizza", type: "pizza", price: 10.99 },
        { id: 2, name: "Classic Burger", type: "burger", price: 8.99 },
      ],
      vendor2: [
        { id: 3, name: "Salmon Sushi", type: "sushi", price: 12.99 },
        // Add more items for vendor2
      ],
      // Add more vendors as needed
    };

    const vendorSelect = document.getElementById("vendor-select");
    const searchInput = document.getElementById("search-input");
    const foodFilter = document.getElementById("food-filter");
    const foodList = document.getElementById("food-list");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const locationInput = document.getElementById("location-input");

    let cart = [];

    // Function to render all food items initially
    function renderAllFoodItems() {
      foodList.innerHTML = "";

      // Loop through all vendors and render their items
      Object.values(vendorData).forEach((vendorItems) => {
        vendorItems.forEach((food) => {
          const foodItem = document.createElement("div");
          foodItem.classList.add("food-item");
          foodItem.innerHTML = `
              <h3>${food.name}</h3>
              <p>${food.type}</p>
              <p>$${food.price.toFixed(2)}</p>
              <button onclick="addToCart(${food.id}, '${
            food.vendor
          }')">Add to Cart</button>
          `;
          foodList.appendChild(foodItem);
        });
      });
    }

    // Function to render food items based on search, filter, and vendor
    function renderFoodItems() {
      const searchTerm = searchInput.value.toLowerCase();
      const filterType = foodFilter.value;
      const selectedVendor = vendorSelect.value;

      // Get food items based on selected vendor
      const vendorFood =
        selectedVendor === "all"
          ? Object.values(vendorData).flat()
          : vendorData[selectedVendor] || [];

      const filteredFood = vendorFood.filter((food) => {
        const matchesSearch = food.name.toLowerCase().includes(searchTerm);
        const matchesFilter = filterType === "all" || food.type === filterType;
        return matchesSearch && matchesFilter;
      });

      foodList.innerHTML = "";

      filteredFood.forEach((food) => {
        const foodItem = document.createElement("div");
        foodItem.classList.add("food-item");
        foodItem.innerHTML = `
          <h3>${food.name}</h3>
          <p>${food.type}</p>
          <p>$${food.price.toFixed(2)}</p>
          <button onclick="addToCart(${food.id}, '${
          food.vendor
        }')">Add to Cart</button>
      `;
        foodList.appendChild(foodItem);
      });
    }

    // Function to add item to the cart
    function addToCart(foodId, vendor) {
      const selectedFood = vendorData[vendor].find(
        (food) => food.id === foodId
      );

      if (selectedFood) {
        cart.push(selectedFood);
        updateCart();
      }
    }

    // Function to update the cart
    function updateCart() {
      cartItems.innerHTML = "";
      let total = 0;

      cart.forEach((item) => {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(cartItem);
        total += item.price;
      });

      cartTotal.textContent = total.toFixed(2);
    }

    // Function to save the user's location
    function saveLocation() {
      const userLocation = locationInput.value;
      // You can use the user's location for various purposes (e.g., filtering restaurants based on location)
      console.log("User Location:", userLocation);
    }

    // Event listeners
    searchInput.addEventListener("input", renderFoodItems);
    foodFilter.addEventListener("change", renderFoodItems);
    vendorSelect.addEventListener("change", renderFoodItems);

    // Initial render
    renderAllFoodItems();
  });

  return (
    <main className="">
      <header>
        <h1>Food Delivery App</h1>
      </header>

      <div id="location-section">
        <label htmlFor="location-input">Enter Your Location:</label>
        <input type="text" id="location-input" placeholder="E.g., Your City" />
        <button onClick="saveLocation()">Save Location</button>
      </div>

      <div id="vendor-section">
        <label htmlFor="vendor-select">Select Vendor:</label>
        <select id="vendor-select">
          <option value="all">All Vendors</option>
          <option value="vendor1">Vendor 1</option>
          <option value="vendor2">Vendor 2</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div id="search-bar">
        <input type="text" id="search-input" placeholder="Search for food..." />
        <select id="food-filter">
          <option value="all">All</option>
          <option value="pizza">Pizza</option>
          <option value="burger">Burger</option>
          <option value="sushi">Sushi</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div id="food-list">
        {/* Food items will be dynamically added here using JavaScript */}
      </div>

      <div id="shopping-cart">
        <h2>Shopping Cart</h2>
        <ul id="cart-items">
          {/* Food items will be dynamically added here using JavaScript */}
        </ul>
        <p>
          Total: $<span id="cart-total">0.00</span>
        </p>
      </div>
    </main>
  );
}

