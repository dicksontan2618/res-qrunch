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
      const additionalDetails = {
        id: id,
        amount: amount || 1, 
      };
      const docRef = doc(db, "menuItems", id);
      const docSnap = await getDoc(docRef);
      const cartItem = Object.assign(docSnap.data(), additionalDetails);
      setCart([...cart, cartItem]);
  
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
        }
      }

      getFoodItem();
    }, []);
    
    return (
      <div className="flex justify-center">
        <div className="flex flex-col w-[85%] gap-y-6 mb-24">
          <div className="card w-full h-[30%] bg-white shadow-xl mt-12">
            <figure>
              <img src={imgUrl}/>
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
            <p className="font-bold text-3xl text-gray-800">{foodName}</p>
            <p className="text-gray-800 font-semibold">
              {ingredients.join(",")}
            </p>
          </div>
          <div className="self-center mt-8">
            <button className="btn btn-ghost bg-main-clr" onClick={addToCart}>
              <p className="text-white">Add to Cart</p>
            </button>
          </div>
        </div>
      </div>
    );
}

export default FoodItem;