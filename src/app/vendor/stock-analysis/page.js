"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const VendorStock = () => {
    const { user } = useAuthContext();
    const router = useRouter();
  
    const [menuItems, setMenuItems] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      if (
        user == null &&
        window.localStorage.getItem("session_user") != "vendor"
      ) {
        router.push("/");
      }
    }, [user]);
  
    useEffect(()=>{
      async function initVendorMenuItems(vendor) {
        const q = query(
          collection(db, "menuItems"),
          where("vendor", "==", vendor.uid)
        );
        const querySnapshot = await getDocs(q);
        const menu_items = querySnapshot.docs.map((doc) =>
          Object.assign(doc.data(), { id: doc.id })
        );
  
        if (!querySnapshot.empty) {
          setIsEmpty(false);
          setMenuItems(menu_items);
        } else {
          setIsEmpty(true);
        }
      }
  
      initVendorMenuItems(user);
      
    },[]);

    const getOrders = async () => {
      const updatedMenuItems = menuItems.map((menuItem) => {
        const soldQuantity = orders
          .filter((order) => order.name === menuItem.name && (order.completion === 'complete' || order.completion === 'pending'))
          .reduce((total, order) => total + order.amount, 0);
        
        var totalLeftovers = orders
          .filter((order) => order.name === menuItem.name && (order.completion === 'complete' || order.completion === 'pending'))
          .reduce((total, order) => total + order.amount, 0);

        totalLeftovers += menuItem.quantity;
          
        return { ...menuItem, soldQuantity, totalLeftovers };
      });
    
      setMenuItems(updatedMenuItems);
    };

    const getSoldItems = async () => {

      let ordersList = [];
      const q = query(
        collection(db, "orders"),
        where("vendor", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
      } else {
        querySnapshot.forEach((doc) => {
          if (doc.data()["completion"] == "complete") {
            ordersList.push(Object.assign(doc.data(), { id: doc.id }));
          }
        });
        
        setOrders(ordersList);
      }
    };

    useEffect(() => {
      getSoldItems();
    }, []);
    
    useEffect(() => {
      getOrders();
    }, [orders]); 
  
    return (
      <div className="flex justify-center">
        <div className="flex flex-col w-[80%] mt-12 mb-24 gap-y-8 justify-center items-center">
          {!isEmpty && menuItems.map(menuItem=>{
            return (
              <Link href={`/vendor/stock-analysis/${menuItem.id}`} key={menuItem.id} className="w-full">
                <div className="card w-full bg-white text-black shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-2xl font-bold">
                      {menuItem.name}
                    </h2>
                    {/* <p className="font-semibold">Code: {menuItem.id}</p> */}
                    <p className="font-semibold">Leftovers: {menuItem.totalLeftovers}</p>
                    <p className="font-semibold">Amount Sold: {menuItem.soldQuantity}</p>
                  </div>
                </div>
              </Link>
            );
          })}
          <p className={isEmpty ? "block text-2xl font-bold text-black":"hidden"}>No Items !</p>
        </div>
      </div>
    );
  };
  
  export default VendorStock;