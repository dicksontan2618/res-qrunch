import React from "react";
import ShoppingCart from "../_components/ShoppingCart"; // Update the path accordingly

const ShoppingCartPage = () => {
  // Assuming you have a way to get the cart state, you might need to fetch it or pass it as a prop
  const cart = []; // Update this with your actual cart data

  return (
    <div>
      <h1>Shopping Cart Page</h1>
      <ShoppingCart cart={cart} />
    </div>
  );
};

export default ShoppingCartPage;
