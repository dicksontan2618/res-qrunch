"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";

import { collection, query, where, getDocs, orderBy, getDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";

const VendorClaimScreen = () => {

  const { user } = useAuthContext();
  const router = useRouter();

  const [claims, setClaims] = useState([]);

  var globalTimeFormatOption = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const getClaims = async () => {

    let claimList = [];

    const docRef = collection(db,"claimedDonations");

    const q = query(
      docRef,
      where("vendor", "==", user.uid), orderBy("claimedAt")
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
    } else {
      querySnapshot.forEach((doc) => {
          let dateStr = doc.data()["claimedAt"]
          let dateObject = new Date(dateStr);
          let formattedDate = dateObject.toLocaleString("en-US", globalTimeFormatOption);

          if(doc.data()["completed"]){
            claimList.push(
              Object.assign(doc.data(), { formattedClaimedAt: formattedDate })
            );
          }
      });
      
      setClaims(claimList);
    }
  };

  useEffect(() => {
    getClaims();
  }, []);

  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") != "vendor") {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[85%] gap-y-4 mb-24 mt-8">
        <h2 className="self-start font-bold text-gray-800 text-xl">Claimed Donations :</h2>
        {claims.map((claim,index)=>{
          return (
            <div key={index} className="flex flex-col">
              <p>{claim.formattedClaimedAt}</p>
              <div className="card card-side">
                <img
                  src={claim.img}
                  className="w-[100px] h-[100px] object-cover rounded-md ml-4 mt-8"
                ></img>
                <div className="card-body">
                  <div className="text-gray-800">
                    <p className="font-bold text-lg">{claim.name}</p>
                    <p className="font-bold text-md">Amount : {claim.amount}</p>
                    <p className="font-bold text-md text-gray-400">Claimed By : {claim.charityName}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VendorClaimScreen;
