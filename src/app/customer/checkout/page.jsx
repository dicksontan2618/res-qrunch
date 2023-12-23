"use client";

import React, { useState, useEffect } from "react";
import ShoppingCart from "@/app/_components/ShoppingCart"; // Update the path accordingly
import Link from 'next/link';

const CheckoutPage = () => {
  // Assuming you have a way to get the cart state, you might need to fetch it or pass it as a prop
  const [checkoutCart, setCheckoutCart] = useState([]);

  const getCartLocalStorage = () => {
    return(JSON.parse((window.localStorage.getItem("session_shoppping_cart"))));
  }

  useEffect(()=>{
    setCheckoutCart(getCartLocalStorage());
  },[])

  return (
    <div>
      <header>
        <Link href="/home">
          <button>Back</button>
        </Link>
        <h1>My Cart</h1>
      </header>
      <br></br><br></br>
      <ShoppingCart cart={checkoutCart} />
    </div>
  );
};

export default CheckoutPage;
