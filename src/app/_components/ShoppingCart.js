"use client";

// ShoppingCart.js
import React from 'react';
import Link from 'next/link';

const ShoppingCart = ({ cart, updateQuantity, removeFromCart }) => {

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const setCartLocalStorage = (checkoutCart) => {
    window.localStorage.setItem("session_shoppping_cart",JSON.stringify(checkoutCart));
  }

  return (
    <div className="mb-12">
      <h2>My Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name}: ${item.price.toFixed(2)} - Quantity: {item.quantity}
            <br></br>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: RM{calculateTotal().toFixed(2)}</p>

      {/* Checkout button linking to the checkout page */}
      <Link href="./checkout">
        <button onClick={() => setCartLocalStorage(cart)}>Checkout</button>
      </Link>
    </div>
  );
};

export default ShoppingCart;
