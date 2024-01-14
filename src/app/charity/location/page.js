"use client";

// Import necessary libraries
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextCharity";
import { useRouter } from "next/navigation";

import MapView from "@/app/_components/MapView";
import GlobalApi from "../../../../shared/GlobalApi";

const CLocPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [restaurantList, setRestaurantList] = useState([]);
  
  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") != "charity") {
      router.push("/");
    } else {
    }
  }, [user]);

  useEffect(() => {
    getRestaurantPlace();
  }, []);

  const getRestaurantPlace = () => {
    GlobalApi.getGooglePlace(
      "restaurant",
      500,
      JSON.parse(window.localStorage.getItem("curLoc"))["lat"],
      JSON.parse(window.localStorage.getItem("curLoc"))["lng"]
    ).then((resp) => {
      setRestaurantList(resp.data.product.results);
    });
  };

  return(
    <div className="w-full">
        <MapView mapList={restaurantList}/>
    </div>
  ) 
};

export default CLocPage;