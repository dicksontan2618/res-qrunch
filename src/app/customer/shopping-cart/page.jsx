"use client";

import React, { useState, useEffect } from "react";
import ShoppingCart from "@/app/_components/ShoppingCart";

const CheckoutPage = () => {
  // Assuming you have a way to get the cart state, you might need to fetch it or pass it as a prop
  const [checkoutCart, setCheckoutCart] = useState([]);

  // const getCartLocalStorage = () => {
  //   return(JSON.parse((window.localStorage.getItem("session_shoppping_cart"))));
  // }

  // useEffect(()=>{
  //   setCheckoutCart(getCartLocalStorage());
  // },[])

  const getCartLocalStorage = () => {
    const storedCart = window.localStorage.getItem("session_shoppping_cart");
    try {
      return JSON.parse(storedCart) || [];
    } catch (error) {
      console.error("Error parsing cart from local storage:", error);
      return [];
    }
  };
  

  useEffect(() => {
    const storedCart = getCartLocalStorage();
    console.log("Stored Cart:", storedCart);
    setCheckoutCart(storedCart);
  }, []);
  

  return (
    <div>

      <br></br><br></br>
      <ShoppingCart cart={checkoutCart} />

    </div>
  );
};

export default CheckoutPage;
