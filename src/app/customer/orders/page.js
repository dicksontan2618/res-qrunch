"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";

import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/utils/firebase";

import Link from "next/link";

const OrdersPage = () => {

  const { user } = useAuthContext();
  const router = useRouter();

  const [userPendingOrders, setUserPendingOrders] = useState([]);
  const [userCompletedOrders, setUserCompletedOrders] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const getUserOrders = async () => {

    let pendingOrdersList = [];
    let completedOrdersList = [];

    const q = query(collection(db, "orders"), where("user_id", "==", user.uid), orderBy("createdAt"));

    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty){
        setIsEmpty(true);
    }
    else{
        setIsEmpty(false);
        querySnapshot.forEach((doc) => {
          if(doc.data()["completion"] == "pending"){
            pendingOrdersList.push(Object.assign(doc.data(), { id: doc.id }));
          }
          else{
            completedOrdersList.push(Object.assign(doc.data(), { id: doc.id }));
          }
        });
        setUserPendingOrders(pendingOrdersList);
        setUserCompletedOrders(completedOrdersList);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") != "user") {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[85%] gap-y-4 mb-24 mt-6">
        <p className="self-start text-gray-400 font-semibold text-xs text-center">
          Kindly show this page during pick up for verification purposes! Don't
          forget to press "Complete Order" after pick up the food!
        </p>
        <p className="self-start text-gray-800 font-semibold">
          Pending Orders :
        </p>
        {!isEmpty &&
          userPendingOrders.map((order, index) => {
            return (
              <Link
                href={`/customer/orders/${order.id}`}
                key={order.id}
                className="w-full"
              >
                <div className="w-full flex gap-x-4 shadow-md h-36 items-center">
                  <img
                    src={order.img}
                    className="w-[100px] h-[100px] object-cover rounded-md ml-4"
                  ></img>
                  <div className="w-[50%]">
                    <div className="text-gray-800">
                      <p className="font-bold text-lg">{order.name}</p>
                      <p className="font-medium text-gray-500">
                        {order.vendor_name}
                      </p>
                      <p className="font-bold text-lg">
                        RM {(order.sellingPrice).toFixed(2)}
                      </p>
                      <p className="">Amount : {order.amount}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        <div className="divider"></div>
        <p className="self-start text-gray-400 font-semibold text-xs text-center">
          Kindly left a review after completing your orders to help other users!
        </p>
        <p className="self-start text-gray-800 font-semibold">
          Completed Orders :
        </p>
        {!isEmpty &&
          userCompletedOrders.map((order, index) => {
            return (
              <Link
                href={`/customer/orders/${order.id}`}
                key={order.id}
                className="w-full"
              >
                <div className="w-full flex gap-x-4 shadow-md h-36 items-center">
                  <img
                    src={order.img}
                    className="w-[100px] h-[100px] object-cover rounded-md ml-4"
                  ></img>
                  <div className="w-[50%]">
                    <div className="text-gray-800">
                      <p className="font-bold text-lg">{order.name}</p>
                      <p className="font-medium text-gray-500">
                        {order.vendor_name}
                      </p>
                      <p className="font-bold text-lg">
                        RM {(order.sellingPrice).toFixed(2)}
                      </p>
                      <p className="">Amount : {order.amount}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        <p
          className={isEmpty ? "block text-2xl font-bold text-black" : "hidden"}
        >
          No Orders !
        </p>
      </div>
    </div>
  );
};

export default OrdersPage;