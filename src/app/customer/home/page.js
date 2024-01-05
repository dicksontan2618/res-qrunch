"use client"

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

import Link from "next/link";
// import NearbyLocation from "@/app/_components/NearbyLocation";

const CustomerScreen = () => {

  const { user } = useAuthContext();
  const router = useRouter();

  const [foodItems, setFoodItems] =  useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [foodItemsCopy, setFoodItemsCopy] = useState([]);
  const [uniqueIngredients, setUniqueIngredients] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  // const [loc, setLoc] = useState({});

  useEffect(()=>{
    if (user == null && window.localStorage.getItem("session_user") != "user") {
      router.push("/");
    }
  },[user])

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

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

  useEffect(() => {
    // Extract unique ingredients from foodItemsCopy
    const allIngredients = foodItemsCopy.flatMap((food) => food.ingredients);
    const uniqueIngredients = [...new Set(allIngredients)];
    setUniqueIngredients(uniqueIngredients);
  }, [foodItemsCopy]);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //    setLoc({
  //       lat: position.coords.latitude,
  //       long: position.coords.longitude
  //     })
  //   });
  // }, []);

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

  const applyFilter = () => {
    // Update the food items based on the selected ingredients
    const filteredFood = foodItemsCopy.filter((food) =>
      !selectedIngredients.some((ingredient) => food.ingredients.includes(ingredient))
    );
    setFoodItems(filteredFood);
  };

  const handleIngredientFilter = (selectedIngredient) => {
    // Toggle the selected ingredient
    const updatedIngredients = selectedIngredients.includes(selectedIngredient)
      ? selectedIngredients.filter((ingredient) => ingredient !== selectedIngredient)
      : [...selectedIngredients, selectedIngredient];
    setSelectedIngredients(updatedIngredients);
  };

  const clearFilters = () => {
    // Reset to show all food items
    setFoodItems(foodItemsCopy);
    setSelectedIngredients([]);
  };

  return (
    <div className="flex flex-col justify-center items-center w-max-screen relative">
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

      <div id="search-bar" className="mt-3">
        <input
          className="input input-bordered w-full max-w-xs bg-white text-black"
          type="text"
          placeholder="Search for food..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>

      <div className="flex justify-end mt-3">
        <button onClick={toggleFilterMenu} className="bg-blue-500 text-white px-2 py-1 rounded">
          {showFilterMenu ? "Hide Filters" : "Show Allergens Filters"}
        </button>
      </div>

      <div
        id="food-list"
        className="flex flex-col w-[80%] mt-12 mb-24 gap-y-4 justify-center items-center"
      >
        {!isEmpty &&
          foodItems.map((foodItem) => {
            return (
              <Link
                href={`/customer/${foodItem.id}`}
                key={foodItem.id}
                className="w-full"
              >
                <div className="card card-compact w-full bg-white text-black shadow-xl">
  <div className="relative overflow-hidden bg-white h-20 rounded-t-xl">
    <img
      className="w-full h-full object-contain object-center"
      src={foodItem.img}
      alt={foodItem.name}
    />
  </div>
  <div className="card-body">
    <h2 className="card-title text-xl font-bold">{foodItem.name}</h2>
    <p className="font-semibold text-gray-500 text-sm">{foodItem.vendor_name}</p>
    <p className="font-semibold text-sm">RM {foodItem.price}</p>
  </div>
</div>

              </Link>
            );
          })}
      </div>

      {/* Ingredients filter menu */}
      {showFilterMenu && (
        <div className="filter-menu absolute top-0 right-0 bg-gray-100 p-4 min-w-[200px] h-[80vh] overflow-auto">
          <div className="flex items-center mb-2">
            <button onClick={toggleFilterMenu} className="bg-blue-500 text-white px-2 py-1 rounded">
              X
            </button>
            <h3 className="text-lg font-semibold ml-2">Allergens Filter</h3>
          </div>
          {uniqueIngredients.map((ingredient) => (
            <div key={ingredient} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={ingredient}
                onChange={() => handleIngredientFilter(ingredient)}
                checked={selectedIngredients.includes(ingredient)}
              />
              <label htmlFor={ingredient} className="ml-2">
                {ingredient}
              </label>
            </div>
          ))}
          <button onClick={applyFilter} className="mt-4 mr-2 bg-green-500 text-white px-2 py-1 rounded">
            Apply Filters
          </button>
          <button onClick={clearFilters} className="mt-4 mr-2 bg-blue-500 text-white px-2 py-1 rounded">
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
};

export default CustomerScreen;
