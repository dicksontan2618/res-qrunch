"use client"
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";

import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";

import OrderList from "@/app/_components/OrderList";

const VendorScreen = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [donatedItems, setDonatedItems] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  var dateStr;

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
      where("vendor", "==", user.uid),
      orderBy("createdAt")
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
    } else {
      querySnapshot.forEach((doc) => {
        dateStr = doc.data()["createdAt"];
        let dateObject = new Date(dateStr.seconds * 1000);
        let formattedDate = dateObject.toLocaleString("en-US", globalTimeFormatOption);
        if (doc.data()["completion"] === "pending") {
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
    if (user == null && window.localStorage.getItem("session_user") !== "vendor") {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    async function initDonatedItems() {
      try {
        const docSnapshot = await getDocs(collection(db, "claimedDonations"));
  
        let hour, minute; // Declare hour and minute using let
  
        // Check if there are documents in the collection
        if (docSnapshot.size > 0) {
          const donated_items = [];
  
          // Iterate through each document
          docSnapshot.docs.forEach((doc) => {
            const stringDate = doc.data()["claimedAt"];
            const dateFromStr = new Date(stringDate);
            hour = dateFromStr.getHours();
            minute = dateFromStr.getMinutes();
            // console.log(hour, minute);
            dateFromStr.setHours(0, 0, 0, 0); // Set time to midnight
  
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight
  
            // Check a specific condition (e.g., quantity is not "0")
            if (
              doc.data()["quantity"] !== "0" &&
              doc.data()["vendor"] === user.uid &&
              dateFromStr.getTime() === today.getTime()
            ) {
              donated_items.push(Object.assign(doc.data(), { id: doc.id }));
            }
          });
  
          // Set state based on the retrieved data
          if (donated_items.length > 0) {
            setDonatedItems(donated_items);
            setIsEmpty(false); // Set to false since there is data
          } else {
            setIsEmpty(true);
          }
        } else {
          setIsEmpty(true); // Set to true if there are no documents
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors appropriately (e.g., set an error state)
      }
    }
  
    // Call the function when the component mounts
    initDonatedItems();
  }, []);  


  const handleRemoveItem = async (itemId) => {
    try {
      setDonatedItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
      // Handle errors appropriately
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[85%] gap-y-2 mb-19 mt-12">
        <h2 className="self-start font-bold text-gray-800 text-xl">Current Orders :</h2>
        <OrderList orders={orders} />
      </div>
      <div className="flex flex-col items-center w-[85%] gap-y-2 mb-24 mt-5">
        <h2 className="self-start font-bold text-gray-800 text-xl">Claimed Items :</h2>
        {!isEmpty &&
          donatedItems.map((claimedItem) => (
            <div key={claimedItem.id} className="m-2 w-[85%]">
              <div className="text-black">
                <h2>Charity Name: {claimedItem.charityName}</h2>
                <p>Food Claimed: {claimedItem.name}</p>
                <p>Amount: {claimedItem.amount}</p>
                {/* <p>Time: {hour}</p> */}
                <button className="relative inline-flex items-center justify-center p-1.5 mt-1 mb-2 me-2 bg-red-500 text-white rounded-full" 
                onClick={() => handleRemoveItem(claimedItem.id)}>Claimed</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VendorScreen;
