"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

const CartPage = () => {

  const { user } = useAuthContext();
  const router = useRouter();

  // Assuming you have a way to get the cart state, you might need to fetch it or pass it as a prop
  const [checkoutCart, setCheckoutCart] = useState([]);
  const [isEmpty, setIsEmpty] =  useState(true);
  const [fee, setFee] =  useState(0);

  const getCartLocalStorage = () => {
    const storedCartString = window.localStorage.getItem("shoppingCart");
    if (storedCartString == "[]"){
      setIsEmpty(true);
    }
    else{
      setIsEmpty(false);
      setCheckoutCart(JSON.parse(window.localStorage.getItem("shoppingCart")));

      const tempCart = JSON.parse(window.localStorage.getItem("shoppingCart"));
      let tempPrice = 0;
      tempCart.map((tempItem)=>{
        tempPrice = tempPrice + tempItem.amount * Number((tempItem.sellingPrice));
      })
      setFee(tempPrice);
    };
  }

  const deleteItem = (index) => {
    const temp = [...checkoutCart]
    const minusPrice = Number(temp[index].sellingPrice * temp[index].amount);
    temp.splice(index, 1)
    setCheckoutCart(temp)
    window.localStorage.setItem("shoppingCart", JSON.stringify(temp));
    setFee(fee- minusPrice);
  }

  const handleCheckout = () => {
    window.localStorage.setItem("donation", "[]");
  }

  useEffect(() => {
    getCartLocalStorage();
  }, []);

  useEffect(()=>{
    if (user == null && window.localStorage.getItem("session_user") != "user") {
      router.push("/");
    }
  },[user])
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-[85%] gap-y-6 mb-24 mt-12">
        {!isEmpty && checkoutCart.map((cartItem, index)=>{
          return(
            <div key={index} className="w-full flex gap-x-4 shadow-md h-36 items-center">
              <img src={cartItem.img} className="w-[100px] h-[100px] object-cover rounded-md ml-4"></img>
              <div className="w-[50%]">
                <div className="text-gray-800">
                  <p className="font-bold text-lg">{cartItem.name}</p>
                  <p className="font-medium text-gray-500">{cartItem.vendor_name}</p>
                  <p className="font-bold text-lg">RM {cartItem.sellingPrice.toFixed(2)}</p>
                  <p className="">Amount : {cartItem.amount}</p>
                </div>
              </div>
              <div className="self-start self-justify-end mt-2 mr-3">
                <button onClick={()=> deleteItem(index)}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
              </div>
            </div>
          )
        })}
        <p className={isEmpty ? "block text-2xl font-bold text-black":"hidden"}>Cart Empty !</p>
        <p className="self-start text-gray-800 font-semibold">Fee : RM {fee.toFixed(2)}</p>
        <Link href="/customer/donation"><button className="btn btn-block bg-main-clr text-white btn-ghost" onClick={handleCheckout}>Checkout</button></Link>
      </div>
    </div>
  );
};

export default CartPage;
