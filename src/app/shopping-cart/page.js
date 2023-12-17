import React from "react";
import ShoppingCart from "../components/ShoppingCart"; // Update the path accordingly

const ShoppingCartPage = () => {
  // Assuming you have a way to get the cart state, you might need to fetch it or pass it as a prop
  const cart = []; // Update this with your actual cart data

  return (
    <main>
      <div className="hidden md:flex md:justify-center md:items-center md:w-screen md:h-screen ">
        <h1>Application only available in mobile view!</h1>
      </div>
      <div className="block md:hidden">
        <h1>Shopping Cart Page</h1>
        <ShoppingCart cart={cart} />
      </div>
    </main>
  );
};

export default ShoppingCartPage;
