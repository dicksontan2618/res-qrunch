"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const VendorStock = ({params}) => {
    const { user } = useAuthContext();
    const router = useRouter();
    const id = params.id;
  
    const [menuItems, setMenuItems] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
        if (user == null && window.localStorage.getItem("session_user") !== "vendor") {
          router.push("/");
        }
      }, [user]);
  
    useEffect(()=>{
      async function initVendorMenuItems(vendor) {
        const q = query(
          collection(db, "menuItems"),
          where("vendor", "==", vendor.uid),
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

    // Calculate the updated menu items based on sold quantities
    const getOrders = async () => {
      const updatedMenuItems = menuItems
        .filter((menuItem) => menuItem.id === id)
        .map((menuItem) => {
          // Calculate the total quantity sold for a specific menu item
          const soldQuantity = orders
            .filter((order) => order.name === menuItem.name && (order.completion === 'complete' || order.completion === 'pending'))
            .reduce((total, order) => total + order.amount, 0);
          
          // Calculate the total leftovers (all food registered in system are leftover in the store), considering both complete and pending orders
          var totalLeftovers = orders
            .filter((order) => order.name === menuItem.name && (order.completion === 'complete' || order.completion === 'pending'))
            .reduce((total, order) => total + order.amount, 0);

            if(menuItem.quantity>0){
              // Add the quantity of item in menu to get the total leftovers
              totalLeftovers += parseInt(menuItem.quantity);
              console.log(menuItem.quantity);
              console.log(totalLeftovers);
            }
          
            
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

    const getIcon = (value) => {
      if(value > 0){
        return <FontAwesomeIcon icon={faArrowUp} style={{color: "#ec043e",}} />;
      }
      return <FontAwesomeIcon icon={faArrowDown} style={{color: "#0ec890",}} />;
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
                    <h2 className="text-2xl font-bold">
                      {menuItem.name}
                    </h2>
                    {/* <p className="font-semibold">Code: {menuItem.id}</p> */}
                    <div className="flex">
                      <div className="mt-5 w-1/2 pr-4">
                        <p className="font-semibold">Leftovers: {menuItem.totalLeftovers}</p>
                        <p className="font-semibold">Amount Sold: {menuItem.soldQuantity}</p>
                        <p className="font-semibold">Leftover (Last Week): {menuItem.soldQuantity + 2}</p>
                      </div>
                      <div className="mt-5 w-1/2">
                        <div className="bg-orange-50 p-4 rounded border border-brown">
                          <p className="font-medium">Weekly leftover rate:</p>
                          <p className="font-semibold">{getIcon((( (menuItem.totalLeftovers -(menuItem.soldQuantity + 2) )/ (menuItem.soldQuantity + 2)) * 10))}{" "}
                            {((( (menuItem.totalLeftovers -(menuItem.soldQuantity + 2) )/ (menuItem.soldQuantity + 2)) * 10)).toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <br/>
                    <p className="font-semibold">Amount of ingredients that should be reduced to restock:</p> <br />
              <table className="table-auto border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 px-4 py-2">Ingredients</th>
                    <th className="border border-gray-400 px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItem.ingredients.map((ingredient, index) => {
                    return (
                      <tr key={index} className="border border-gray-400">
                        <td className="border border-gray-400 px-4 py-2">{ingredient.ingredient}</td>
                        <td className="border border-gray-400 px-4 py-2">{ingredient.amount * menuItem.totalLeftovers - menuItem.soldQuantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Link>
          );
        })}
        <p className={isEmpty ? "block text-2xl font-bold text-black" : "hidden"}>No Items !</p>
      </div>
    </div>
  );
};

export default VendorStock;