"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";

import { db } from "@/utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import Swal from "sweetalert2";

const OrderItem = ({ params }) => {

  const { user } = useAuthContext();
  const router = useRouter();
  const id = params.id;

  const [orderItem, setOrderItem] = useState({});
  const [orderStatus, setOrderStatus] = useState(false);

  const getOrderItem = async () => {
    const docRef = doc(db, "orders", id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      if(docSnap.data()["completion"] == "pending"){
        setOrderStatus(false);
      }
      else{
        setOrderStatus(true);
      }
      setOrderItem(docSnap.data());
    }
  }

  const updateOrderStatus = async () => {
    const orderRef = doc(db, "orders", id);

    await updateDoc(orderRef, {
      completion: "complete"
    });

  }
  
  const completeOrder = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Complete My Order.",
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrderStatus();
        Swal.fire({
          title: "Confirmation Received !",
          text: "Your order was completed.",
          icon: "success",
        }).then((result) => {
          router.push("/customer/orders");
        });
      }
    });
  }

  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") != "user") {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    getOrderItem();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[85%] gap-y-6 mb-24">
        <div className="card w-fullbg-white shadow-xl mt-8 rounded-xl">
          <figure>
            <img src={orderItem.img} className="rounded-xl" />
          </figure>
        </div>
        <p className="text-2xl font-bold text-gray-800">Order Details :</p>
        <div className="flex flex-col gap-y-2">
          <p className="text-gray-800 font-semibold">
            Reference ID : <span className="font-medium">{orderItem.id}</span>
          </p>
          <p className="text-gray-800 font-semibold">
            Name : <span className="font-medium">{orderItem.name}</span>
          </p>
          <p className="text-gray-800 font-semibold">
            Vendor :{" "}
            <span className="font-medium">{orderItem.vendor_name}</span>
          </p>
          <p className="text-gray-800 font-semibold">
            Amount : <span className="font-medium">{orderItem.amount}</span>
          </p>
        </div>
        {!orderStatus && (
          <div className="self-center mt-8">
            <button
              className="btn btn-ghost bg-main-clr"
              onClick={completeOrder}
            >
              <p className="text-white">Complete Order</p>
            </button>
          </div>
        )}
        {orderStatus && (
          <div className="self-center mt-8">
            <button
              className="btn btn-ghost bg-main-clr"
            >
              <p className="text-white">Leave Review</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItem;