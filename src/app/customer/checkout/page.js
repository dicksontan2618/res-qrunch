"use client"

import React, { useState } from 'react';

const CheckoutPage = () => {
  const [totalAmount, setTotalAmount] = useState(100);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [showDonation, setShowDonation] = useState(false);
  const [donationItems, setDonationItems] = useState([]);

  const handleDonationToggle = () => {
    setShowDonation(!showDonation);
  };

  const handleDonationItemToggle = (item, operation) => {
    const updatedDonationItems = [...donationItems];
    const existingItemIndex = updatedDonationItems.findIndex(
      (donation) => donation.id === item.id
    );

    if (existingItemIndex !== -1) {
      if (operation === 'add') {
        updatedDonationItems[existingItemIndex].quantity += 1;
      } else if (operation === 'remove') {
        updatedDonationItems[existingItemIndex].quantity -= 1;
        if (updatedDonationItems[existingItemIndex].quantity === 0) {
          // Remove the item if quantity becomes zero
          updatedDonationItems.splice(existingItemIndex, 1);
        }
      }
    } else {
      // Add the item if not present
      updatedDonationItems.push({ ...item, quantity: 1 });
    }

    // Recalculate the total amount based on selected donation items
    const donationTotal = updatedDonationItems.reduce(
      (donationTotal, item) => donationTotal + item.amount * item.quantity,
      0
    );
    setTotalAmount(100 + donationTotal); // Assuming initial total is $100
    setDonationItems(updatedDonationItems);
  };

  const handlePayment = () => {
    if (selectedPaymentMethod) {
      if (selectedPaymentMethod === 'fpx' && !selectedBank) {
        console.log('Please select a bank for FPX payment.');
      } else {
        console.log(`Payment of $${totalAmount} using ${selectedPaymentMethod} successful!`);
        if (selectedBank) {
          console.log(`Selected bank for FPX payment: ${selectedBank}`);
        }
      }
    } else {
      console.log('Please select a payment method.');
    }
  };

  const donationMenu = [
    { id: 1, name: 'Food for 1 pax', amount: 4.99 },
    { id: 2, name: 'Food for 5 pax', amount: 16.99 },
    { id: 3, name: '10 kg Rice', amount: 30.99 },
  ];

  return (
    <div>
      <p>Total Amount: ${totalAmount}</p>

      <br />

      <div>
        <h3>Donation Items</h3>
        <br />
        <div className="donation-container">
          {donationMenu.map((donation) => (
            <div key={donation.id} className="donation-item">
              <p>{donation.name}</p>
              <p>${donation.amount}</p>
              <div>
                <button onClick={() => handleDonationItemToggle(donation, 'remove')}>-</button>
                <span>{donationItems.find((item) => item.id === donation.id)?.quantity || 0}</span>
                <button onClick={() => handleDonationItemToggle(donation, 'add')}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <br />

      <div>
        <h3>Select Payment Method</h3>
        <br />

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            checked={selectedPaymentMethod === 'creditCard'}
            onChange={() => {
              setSelectedPaymentMethod('creditCard');
              setSelectedBank(null);
            }}
          />
          Credit Card
        </label>

        <br />

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

        <br />

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
      </div>

      <br />

      <button id="paymentButton" onClick={handlePayment}>Proceed to Pay</button>
    </div>
  );
};

export default CheckoutPage;

