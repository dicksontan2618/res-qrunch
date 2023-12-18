import React from "react";
import ShoppingCart from "../_components/ShoppingCart"; // Update the path accordingly
import Link from 'next/link';

const ShoppingCartPage = () => {
  // Assuming you have a way to get the cart state, you might need to fetch it or pass it as a prop
  const cart = []; // Update this with your actual cart data

  return (
    <div>
      <header>
        <Link href="/home">
          <button>Back</button>
        </Link>
        <h1>My Cart</h1>
      </header>
      <br></br><br></br>
      <ShoppingCart cart={cart} />
    </div>
  );
};

export default ShoppingCartPage;
