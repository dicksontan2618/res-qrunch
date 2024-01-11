"use client";

// Import necessary libraries
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";

import MapView from "@/app/_components/MapView";
import GlobalApi from "../../../../shared/GlobalApi";

const CLocPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [charityList, setCharityList] = useState([]);
  
  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") != "user") {
      router.push("/");
    } else {
    }
  }, [user]);

  useEffect(() => {
    getCharityPlace();
  }, []);

  const getCharityPlace = () => {
    GlobalApi.getGooglePlace(
      "charity",
      500,
      JSON.parse(window.localStorage.getItem("curLoc"))["lat"],
      JSON.parse(window.localStorage.getItem("curLoc"))["lng"]
    ).then((resp) => {
      setCharityList(resp.data.product.results);
    });
  };

  return(
    <div className="w-full">
        <MapView mapList={charityList} isVendor={false}/>
    </div>
  ) 
};

export default CLocPage;