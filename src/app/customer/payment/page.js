"use client";

// Import necessary libraries
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

const PaymentPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") != "user") {
      router.push("/");
    } else {
    }
  }, [user]);

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
        Swal.fire({
          title: "Paid !",
          text: "Your payment has been processed.",
          icon: "success",
        }).then((result)=>{
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
