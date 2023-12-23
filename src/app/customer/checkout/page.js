"use client"

import React, { useState } from 'react';

const CheckoutPage = () => {
  const [totalAmount, setTotalAmount] = useState(100); // Set your total amount
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);

  const handlePayment = () => {
    if (selectedPaymentMethod) {
      if (selectedPaymentMethod === 'fpx' && !selectedBank) {
        console.log('Please select a bank for FPX payment.');
      } else {
        // Implement your payment logic here
        console.log(`Payment of $${totalAmount} using ${selectedPaymentMethod} successful!`);
        if (selectedBank) {
          console.log(`Selected bank for FPX payment: ${selectedBank}`);
        }
      }
    } else {
      console.log('Please select a payment method.');
    }
  };

  // List of banks for FPX
  const fpxBanks = ['Maybank', 'Bank Islam', 'Bank Rakyat', 'CIMB Bank']; // Add actual bank names

  return (
    <div>
      <p>Total Amount: ${totalAmount}</p>

      <br></br>

      <div>
        <h3>Select Payment Method</h3>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            checked={selectedPaymentMethod === 'creditCard'}
            onChange={() => {
              setSelectedPaymentMethod('creditCard');
              setSelectedBank(null); // Reset selected bank for other payment methods
            }}
          />
          Credit Card
        </label>

        <br></br>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={selectedPaymentMethod === 'paypal'}
            onChange={() => {
              setSelectedPaymentMethod('paypal');
              setSelectedBank(null);
            }}
          />
          PayPal
        </label>

        <br></br>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="fpx"
            checked={selectedPaymentMethod === 'fpx'}
            onChange={() => setSelectedPaymentMethod('fpx')}
          />
          FPX

          {/* Display the bank selection for FPX */}
          {selectedPaymentMethod === 'fpx' && (
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="" disabled>
                Select Bank
              </option>
              {fpxBanks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          )}
        </label>

        {/* Add more payment methods as needed */}
      </div>

      <br></br>

      <button onClick={handlePayment}>Proceed to Pay</button>
    </div>
  );
};

export default CheckoutPage;

