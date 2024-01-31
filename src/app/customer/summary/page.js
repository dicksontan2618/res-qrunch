"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

function SummaryPage() {

    const [cartItems, setCartItems] = useState(JSON.parse(window.localStorage.getItem("shoppingCart")));
    const [donationItems, setDonationItems] = useState(JSON.parse(window.localStorage.getItem("donation")));

    const [cartFee, setCartFee] = useState(0);
    const [donationFee, setDonationFee] = useState(0);
    const [donationPoints, setDonationPoints] = useState(0);

    const getFee = () => {
        let tempCartPrice = 0;
        cartItems.map((tempItem) => {
          tempCartPrice = tempCartPrice + tempItem.amount * Number(tempItem.sellingPrice);
        });
        setCartFee(tempCartPrice.toFixed(2));
    }

    const getDonation = () => {
        let tempDonationPrice = 0;
        donationItems.map((tempItem) => {
          tempDonationPrice = tempDonationPrice + tempItem.amount * Number(tempItem.sellingPrice);
        });
        setDonationFee((tempDonationPrice/2).toFixed(2));
    }

    // Set it as RM 1 = 10 points
    const getPoints = () => {
        let tempDonationPrice = 0;
        donationItems.map((tempItem) => {
          tempDonationPrice =
            tempDonationPrice + tempItem.amount * Number(tempItem.sellingPrice);
        });
        setDonationPoints(((tempDonationPrice / 2)*10));
    }

    const saveDonationPoints = () => {
      window.localStorage.setItem("donation_points", donationPoints.toString());
    }

    useEffect(()=>{
        getFee();
        getDonation();
        getPoints();
    },[])

    return (
      <div className="w-[90%] m-auto mb-24">
        <p className="mt-4 text-gray-800 font-semibold">Order Summary :</p>
        {cartItems.map((cartItem, index) => {
          return (
            <div
              key={index}
              className="w-full flex gap-x-4 shadow-md h-36 items-center"
            >
              <img
                src={cartItem.img}
                className="w-[100px] h-[100px] object-cover rounded-md ml-4"
              ></img>
              <div className="w-[50%]">
                <div className="text-gray-800">
                  <p className="font-bold text-lg">{cartItem.name}</p>
                  <p className="font-medium text-gray-500">
                    {cartItem.vendor_name}
                  </p>
                  <p className="font-bold text-lg">RM {cartItem.sellingPrice.toFixed(2)}</p>
                  <p className="">Amount : {cartItem.amount}</p>
                </div>
              </div>
            </div>
          );
        })}
        <p className="my-2 text-gray-800 font-medium">Donation Items :</p>
        {donationItems.map((donationItem, index) => {
          return (
            <div
              className="w-full flex gap-x-4 shadow-md h-36 items-center"
              key={index}
            >
              <img
                src={donationItem.img}
                className="w-[100px] h-[100px] object-cover rounded-md ml-4"
              ></img>
              <div className="w-[50%]">
                <div className="text-gray-800">
                  <p className="font-bold text-lg">{donationItem.name}</p>
                  <p className="font-medium text-gray-500">
                    {donationItem.vendor_name}
                  </p>
                  <p className="font-bold text-lg">
                    RM {(Number(donationItem.sellingPrice) / 2).toFixed(2).toString()}
                  </p>
                  <p className="">Amount : {donationItem.amount}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="mt-8 text-gray-800 font-medium">
          <div className="w-full flex justify-between">
            <p>Items Total : </p>
            <p>RM {cartFee}</p>
          </div>
          <div className="w-full flex justify-between">
            <p>Donation Total : </p>
            <p>RM {donationFee}</p>
          </div>
          <div className="w-full flex justify-between">
            <p>Donation Points Received : </p>
            <p>{donationPoints.toFixed(0)}</p>
          </div>
          <div className="w-full flex justify-between mt-4">
            <p>Total : </p>
            <p>RM {(Number(cartFee) + Number(donationFee)).toFixed(2)}</p>
          </div>
        </div>

        <Link href="/customer/payment">
          <div className="mt-8 flex justify-center">
            <button className="btn btn-ghost btn-wide bg-main-clr text-white font-semibold" onClick={saveDonationPoints}>
              Proceed to Payment
            </button>
          </div>
        </Link>
      </div>
    );
}

export default SummaryPage;