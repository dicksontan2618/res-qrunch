"use client"

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

import Link from "next/link";
import ShoppingCart from "@/app/_components/ShoppingCart";

const CustomerScreen = () => {

  const { user } = useAuthContext();
  const router = useRouter();

  const [foodItems, setFoodItems] =  useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [foodItemsCopy, setFoodItemsCopy] = useState([]);

  useEffect(()=>{
    if (user == null && window.localStorage.getItem("session_user") != "user") {
      router.push("/");
    }
  },[user])

  useEffect(()=>{

    async function initFoodItems(){
      const docSnapshot = await getDocs(collection(db, "menuItems"));
      const food_items = docSnapshot.docs.map((doc) =>
        Object.assign(doc.data(), { id: doc.id })
      );
      if (!docSnapshot.empty) {
        setIsEmpty(false);
        setFoodItems(food_items);
        setFoodItemsCopy(food_items);
      } else {
        setIsEmpty(true);
      }
    }

    initFoodItems();

  },[])

  useEffect(()=>{
    if (window.localStorage.getItem("initShoppingCart") == "false") {
      window.localStorage.setItem("shoppingCart", "[]");
      window.localStorage.setItem("initShoppingCart", "true");
    }
  },[])

  useEffect(() => {
    reRenderFoodItems();
  }, [searchTerm]);

  const reRenderFoodItems = () => {

    // Filter based on search term
    const formattedSearchTerm = searchTerm.toLowerCase().replace(/\s/g, "");
    let filteredFood = foodItemsCopy.filter((food) => food.name.toLowerCase().includes(formattedSearchTerm));
    setFoodItems(filteredFood);
  }

  // For future location functionality reference
  const renderFoodItems = () => {
    // Filter based on user location
    if (locationInput) {
      const formattedLocationInput = locationInput
        .toLowerCase()
        .replace(/\s/g, "");

      filteredFood = filteredFood.filter((food) =>
        vendorData.some(
          (vendor) =>
            vendor.location.some((loc) =>
              loc
                .toLowerCase()
                .replace(/\s/g, "")
                .includes(formattedLocationInput)
            ) && vendor.items.includes(food)
        )
      );
    }

    return filteredFood.map((food) => (
      <div key={food.id} className="food-item">
        <h3>{food.name}</h3>
        <p>{vendorData.find((vendor) => vendor.items.includes(food))?.name}</p>
        <p>${food.price.toFixed(2)}</p>
        <button onClick={() => addToCart(food)}>Add to Cart</button>
      </div>
    ));
  };

  const saveLocation = () => {
    // Now use the state variable to get the location value
    const userLocation = locationInput.toLowerCase().replace(/\s/g, "");

    // You can use the user's location for various purposes
    console.log("User Location:", userLocation);
  };

  return (
    <div className="flex flex-col justify-center items-center w-max-screen">
      {/* <div id="location-section">
        <label htmlFor="location-input">Enter Your Location:</label>
        <input
          type="text"
          id="location-input"
          placeholder="E.g., Your City"
          value={locationInput} // Bind the value to the state variable
          onChange={(e) => setLocationInput(e.target.value)} // Update the state on input change
        />
        <button onClick={saveLocation}>Save Location</button>
      </div>*/}

      <div id="search-bar">
        <input
          className="input input-bordered w-full max-w-xs bg-white text-black"
          type="text"
          placeholder="Search for food..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />

      </div>

      <div
        id="food-list"
        className="flex flex-col w-[80%] mt-12 mb-24 gap-y-8 justify-center items-center"
      >
        {!isEmpty &&
          foodItems.map((foodItem) => {
            return (
              <Link
                href={`/customer/${foodItem.id}`}
                key={foodItem.id}
                className="w-full"
              >
                <div className="card w-full bg-white text-black shadow-xl">
                  <img className="object-cover h-48" src={foodItem.img} />
                  <div className="card-body">
                    <h2 className="card-title text-2xl font-bold">
                      {foodItem.name}
                    </h2>
                    <p className="font-semibold text-gray-500">{foodItem.vendor_name}</p>
                    <p className="font-semibold">RM {foodItem.price}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default CustomerScreen;
