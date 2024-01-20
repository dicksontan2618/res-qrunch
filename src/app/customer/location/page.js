"use client";

// Import necessary libraries
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";

import MapView from "@/app/_components/MapView";
import GlobalApi from "../../../../shared/GlobalApi";

const LocPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [businessList, setBusinessList] = useState([]);
  
  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") != "user") {
      router.push("/");
    } else {
    }
  }, [user]);

  useEffect(() => {
    getGooglePlace();
  }, []);

  const getGooglePlace = () => {
      GlobalApi.getGooglePlace(
        "restaurant",
        500,
        JSON.parse(window.localStorage.getItem("curLoc"))["lat"],
        JSON.parse(window.localStorage.getItem("curLoc"))["lng"]
      ).then((resp) => {
        setBusinessList(resp.data.product.results);
      });
  };

  return(
    <div className="w-full">
        <MapView mapList={businessList} num={10}/>
    </div>
  ) 
};

export default LocPage;