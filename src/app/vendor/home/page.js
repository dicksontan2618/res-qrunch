"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";

import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/utils/firebase";

import OrderList from "@/app/_components/OrderList";

const VendorScreen = () => {

  const { user } = useAuthContext();
  const router = useRouter();

  var globalTimeFormatOption = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {

    let ordersList = [];

    const q = query(
      collection(db, "orders"),
      where("vendor", "==", user.uid), orderBy("createdAt")
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
    } else {
      querySnapshot.forEach((doc) => {
        let dateStr = doc.data()["createdAt"];
        let dateObject = new Date(dateStr.seconds * 1000);
        let formattedDate = dateObject.toLocaleString("en-US",globalTimeFormatOption);
        if (doc.data()["completion"] == "pending") {
          ordersList.push(Object.assign(doc.data(), { id: doc.id, formattedCreatedAt: formattedDate }));
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
