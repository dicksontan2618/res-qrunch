"use client";

// Import necessary libraries
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";

import { collection, doc, addDoc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "@/utils/firebase";

import Swal from "sweetalert2";

const PaymentPage = () => {

  const [cartItems, setCartItems] = useState(
    JSON.parse(window.localStorage.getItem("shoppingCart"))
  );
  const [donationItems, setDonationItems] = useState(
    JSON.parse(window.localStorage.getItem("donation"))
  );

  const [userPrevPoints, setUserPrevPoints] = useState(0);

  const userDonationPoints = Number(window.localStorage.getItem("donation_points"));

  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") != "user") {
      router.push("/");
    } else {
    }
  }, [user]);

  useEffect(() => {
    getUserPreviousPoints();
  }, []);

  const getUserPreviousPoints = async () => {
    const custRef = doc(db, "customers", user.uid);
    const docSnap = await getDoc(custRef);

    if (docSnap.exists()) {
      if(docSnap.data()["points"]){
        setUserPrevPoints(docSnap.data()["points"]);
      }
    } 
  }
  
  const checkOut = () => {
    cartItems.map(async (tempItem) => {
        const docRef = await addDoc(
          collection(db, "orders"),
          Object.assign(tempItem, {
            user_id: user.uid,
            completion: "pending",
            reviewed: false,
            createdAt: Timestamp.now(),
          })
        );

        const prodRef = doc(db, "menuItems", tempItem.id);
        setDoc(prodRef, {quantity : (Number(tempItem.quantity) - tempItem.amount).toString()}, {merge : true});
    });
    if (donationItems && donationItems.length){
      donationItems.map(async (tempItem) => {
        const docRef = await addDoc(
          collection(db, "donations"),
          Object.assign(tempItem, {
            user_id: user.uid,
            createdAt: Timestamp.now(),
          })
        );

        const prodRef = doc(db, "menuItems", tempItem.id);
        setDoc(
          prodRef,
          {
            quantity: (Number(tempItem.quantity) - tempItem.amount).toString(),
          },
          { merge: true }
        );
      });

      const cusRef = doc(db, "customers", user.uid);
      setDoc(cusRef, { points : (userPrevPoints + userDonationPoints) }, { merge: true });
    }
  }

  const handlePayment = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed with Payment",
    }).then((result) => {
      if (result.isConfirmed) {
        checkOut();
        Swal.fire({
          title: "Paid !",
          text: "Your payment has been processed.",
          icon: "success",
        }).then((result)=>{
          window.localStorage.setItem("shoppingCart","[]")
          window.localStorage.setItem("donation", "[]");
          window.localStorage.removeItem("donation_points");
          router.push("/customer/home");
        })
      }
    });
  }

  return (
    <div className="w-full">
      <div className="w-[90%] m-auto mt-8">
        <p className="text-gray-800 font-bold">Select a Payment Method</p>
        <div className="flex my-8 justify-between">
          <button className="border">
            <img src="/payment-img-1.webp"></img>
          </button>
          <button className="border">
            <img src="/payment-img-2.webp"></img>
          </button>
          <button className="border">
            <img src="/payment-img-3.webp"></img>
          </button>
        </div>
        <div>
          <p className="text-gray-800 font-semibold">Card Number</p>
          <input
            type="text"
            placeholder="Number"
            className="input input-bordered w-full bg-white text-gray-500 mt-2"
          />
        </div>
        <div className="flex justify-between mt-6">
          <div className="w-[40%]">
            <p className="text-gray-800 font-semibold">Expiration Date</p>
            <input
              type="text"
              placeholder="MM/YY"
              className="input input-bordered w-full bg-white text-gray-500 mt-2"
            />
          </div>
          <div className="w-[40%]">
            <p className="text-gray-800 font-semibold">Security Code</p>
            <input
              type="text"
              placeholder="###"
              className="input input-bordered w-full bg-white text-gray-500 mt-2"
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="btn btn-ghost btn-wide bg-main-clr text-white font-bold"
            onClick={() => handlePayment()}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
