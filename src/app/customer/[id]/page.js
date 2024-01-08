"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";

import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import useDidMountEffect from "@/app/_components/useDidMountEffect";

const FoodItem = ({params}) => {
    const { user } = useAuthContext();
    const router = useRouter();
    const id = params.id;

    const [foodName, setFoodName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [cart, setCart] = useState(JSON.parse(window.localStorage.getItem("shoppingCart")));

    const [amount, setAmount] =  useState(0);

    const [reviews,setReviews] = useState([]);
    const [isEmpty, setisEmpty] = useState(true);

    const increment = () => {
        if((amount + 1) <= Number(quantity))
        setAmount(amount => amount + 1);
    }

    const decrement = () => {
        if((amount - 1) >= 0){
            setAmount(amount => amount - 1);
        }
    }

    const addToCart = async () => {
      const existingCartItem = cart.find((item) => item.id === id);
  
      if (existingCartItem) {
        // Item already exists in the cart, update the quantity
        const updatedCart = cart.map((item) =>
          item.id === id
            ? { ...item, amount: amount }
            : item
        );
        setCart(updatedCart);
      } else {
        // Item is not in the cart, add a new item
        const additionalDetails = {
          id: id,
          amount: amount || 1,
        };
        const docRef = doc(db, "menuItems", id);
        const docSnap = await getDoc(docRef);
        const cartItem = Object.assign(docSnap.data(), additionalDetails);
        setCart([...cart, cartItem]);
      }
  
      router.push("/customer/home");
    };

    useEffect(() => {
      if (
        user == null &&
        window.localStorage.getItem("session_user") != "user"
      ) {
        router.push("/");
      }
    }, [user]);

    useDidMountEffect(() =>{
        window.localStorage.setItem("shoppingCart", JSON.stringify(cart));
    },[cart])

    useEffect(() => {
      async function getFoodItem() {
        const docRef = doc(db, "menuItems", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setFoodName(docSnap.data()["name"]);
          setIngredients(docSnap.data()["ingredients"]);
          setImgUrl(docSnap.data()["img"]);
          setPrice(docSnap.data()["price"]);
          setQuantity(docSnap.data()["quantity"]);

          if(docSnap.data()["reviews"].length){
            setisEmpty(false);
            setReviews(docSnap.data()["reviews"]);

          }
    
          // Check if the item is already in the cart
          const existingCartItem = cart.find((item) => item.id === id);
          if (existingCartItem) {
            setAmount(existingCartItem.amount);
          }
        }
      }
    
      getFoodItem();
    }, [id, cart]);
    
    return (
      <div className="flex justify-center">
        <div className="flex flex-col w-[85%] gap-y-6 mb-24">
          <div className="card w-full h-[30%] bg-white shadow-xl mt-12">
            <figure>
              <img src={imgUrl} />
            </figure>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4">
            <div className="flex h-7 items-center gap-x-4">
              <button
                className="btn btn-circle btn-outline"
                onClick={decrement}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <p className="text-xl">{amount}</p>
              <button
                className="btn btn-circle btn-outline"
                onClick={increment}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <p className="h-3 font-semibold">Qty : {quantity}</p>
          </div>
          <div className="flex flex-col h-8 gap-y-2">
            <div className="w-full flex justify-between items-center">
              <p className="font-bold text-3xl text-gray-800">{foodName}</p>
              <button
                className="btn btn-ghost underline"
                onClick={() => document.getElementById("modal").showModal()}
              >
                Reviews
              </button>
            </div>
            <div className="flex gap-x-2">
              {ingredients.map((ingredient, index) => {
                return <p key={index}>{ingredient.ingredient}</p>;
              })}
            </div>
          </div>
          <div className="self-center mt-16">
            <button className="btn btn-ghost bg-main-clr" onClick={addToCart}>
              <p className="text-white">Add to Cart</p>
            </button>
          </div>
        </div>
        <dialog id="modal" className="modal">
          <div className="modal-box h-1/2 overflow-scroll">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg mb-3">Reviews</h3>
            {!isEmpty &&
              reviews.map((review, index) => {
                return (
                  <div key={index} className="flex flex-col gap-y-1 my-4">
                    <p className="font-bold">{review.cus_name}</p>
                    <p className="font-medium">{review.msg}</p>
                  </div>
                );
              })}
            {isEmpty && <p className="py-4">No reviews yet !</p>}
          </div>
        </dialog>
      </div>
    );
}

export default FoodItem;