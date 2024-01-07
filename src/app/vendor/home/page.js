"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";

import OrderList from "@/app/_components/OrderList";

const VendorScreen = () => {

  const { user } = useAuthContext();
  const router = useRouter();

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {

    let ordersList = [];

    const q = query(
      collection(db, "orders"),
      where("vendor", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
    } else {
      querySnapshot.forEach((doc) => {
        if (doc.data()["completion"] == "pending") {
          ordersList.push(Object.assign(doc.data(), { id: doc.id }));
        }
      });
      
      setOrders(ordersList);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") != "vendor") {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[85%] gap-y-4 mb-24 mt-12">
        <h2 className="self-start font-bold text-gray-800 text-xl">Current Orders :</h2>
        <OrderList orders={orders} />
      </div>
    </div>
  );
};

export default VendorScreen;
