"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";

import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const CartPage = () => {

  const { user } = useAuthContext();
  const router = useRouter();

  // Assuming you have a way to get the cart state, you might need to fetch it or pass it as a prop
  const [checkoutCart, setCheckoutCart] = useState([]);
  const [checkoutCartDetails, setCheckoutCartDetails] = useState([]);
  const [isEmpty, setIsEmpty] =  useState(true);
  const [fee, setFee] =  useState("");

  const getCartLocalStorage = () => {
    const storedCartString = window.localStorage.getItem("shoppingCart");
    if (storedCartString == "[]"){
      setIsEmpty(true);
    }
    else{
      setIsEmpty(false);
      setCheckoutCart(JSON.parse(window.localStorage.getItem("shoppingCart")));
    }
  };

  async function getCartLocalStorageDetails(cart) {
    cart.forEach(async (item) => {
      const docRef = doc(db, "menuItems", item.id);
      const docSnap = await getDoc(docRef);


    });
  };
  
  useEffect(() => {
    getCartLocalStorage();
  }, []);

  useEffect(()=>{
    if (user == null && window.localStorage.getItem("session_user") != "user") {
      router.push("/");
    }
  },[user])
  
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[85%] gap-y-6 mb-24">
        {checkoutCart.map((cartItem, index)=>{
          return(
            <div key={index}>
              <p>{cartItem.id}</p>
              <p>{cartItem.amount}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default CartPage;
