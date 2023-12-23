"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import OrderList from "@/app/_components/OrderList";
// import SalesChart from "@/app/_components/SalesChart";

const VendorScreen = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") != "vendor") {
      router.push("/");
    }
  }, [user]);

  const [orders, setOrders] = useState([
    { id: 1, items: ['Item1', 'Item2'], customer: 'Customer1', message: 'Hi, pls give me sauce'},
    { id: 2, items: ['Item3', 'Item4'], customer: 'Customer2', message: 'Hi, pls ive more chili' },
    // ... more orders
  ]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
        window.localStorage.removeItem("session_user");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <h1>Vendor Home Page</h1>

      <div>
        <h2>Orders</h2>
        <OrderList orders={orders} />
      </div>

      {/* <div>
        <h2>Sales</h2>
        <SalesChart data={salesData} />
      </div> */}

    </div>
  );
};

export default VendorScreen;
