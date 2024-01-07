"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Link from "next/link";

import DonationItem from "@/app/_components/DonationItem";

const DonationPage = () => {
  const [fee, setFee] = useState(0);
  const [donationSellItems, setDonationSellItems] = useState([]);
  const [donationItems, setDonationItems] = useState([]);

  const handleDonationItemToggle = (item, operation) => {
    const updatedDonationItems = [...donationItems];
    const existingItemIndex = updatedDonationItems.findIndex(
      (donation) => donation.id === item.id
    );
  
    if (existingItemIndex !== -1) {
      if (operation === "add") {
        updatedDonationItems[existingItemIndex].quantity += 1;
      } else if (operation === "remove") {
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
    setDonationItems(updatedDonationItems);
    setFee(donationTotal);
  };
  
  const getShoppingCartVendors = async () => {
    
    let uniqueVendorsList = [];
    let vendorsAllProductsList = [];
    let tempPrice = 0;

    const tempCart = JSON.parse(window.localStorage.getItem("shoppingCart"));
    const uniqueVendorsObj = tempCart.filter((obj, index) => {
      return index === tempCart.findIndex((o) => obj.vendor === o.vendor);
    });
    uniqueVendorsObj.map((obj)=>{
        uniqueVendorsList.push(obj.vendor);
    })

    let uniqueCartIds = tempCart.map((obj)=>{
        return obj.id;
    })

    tempCart.map((tempItem) => {
      tempPrice = tempPrice + tempItem.amount * Number(tempItem.price);
    });
    setFee(tempPrice);

    const q = query(collection(db, "menuItems"), where("vendor", "in", uniqueVendorsList));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (doc.data()["quantity"] != "0"){
          vendorsAllProductsList.push(
            Object.assign(doc.data(), { id: doc.id })
          );
        }
    });
    
    vendorsAllProductsList.forEach((prod)=>{
        if (uniqueCartIds.includes(prod.id)) {
          let minusAmt = tempCart.find((x) => x.id === prod.id).amount;
          prod["quantity"] = (Number(prod["quantity"]) - minusAmt).toString();
        }
    });

    setDonationSellItems(vendorsAllProductsList);
  }

  useEffect(()=>{
    getShoppingCartVendors();
  },[])

  return (
    <div className="w-[90%] m-auto mb-24">
      <p className="mt-4 text-gray-800 font-semibold">
        Total amount in cart: RM {fee.toFixed(2)}
      </p>
      <p className="my-2 text-gray-800">Donation Options: <br/>(Selected items will be redeemed by charities for underprivileged)</p>
      {donationSellItems.map((item, index) => (
        <DonationItem
          key={index}
          item={item}
          limit={Number(donationSellItems[index]["quantity"])}
          onToggle={(operation) => handleDonationItemToggle(item, operation)}
        />
      ))}
      <Link href="/customer/summary">
        <div className="mt-4 flex justify-center">
          <button className="btn btn-ghost btn-wide bg-main-clr text-white font-semibold">
            Proceed to Pay
          </button>
        </div>
      </Link>
    </div>
  );
};

export default DonationPage;