"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextCharity";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

const CharityScreen = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [donationList, setDonationList] = useState([])
  const [claimCart, setClaimCart] = useState([])

  useEffect(() => {
    if (
      user == null &&
      window.localStorage.getItem("session_user") != "charity"
    ) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    getDonationList();
    window.localStorage.setItem("claimList", "[]");
  },[])

  const getDonationList = async () => {

    const tempList = [];

    const donationsRef = collection(db, "donations");
    const querySnapshot = await getDocs(
      query(donationsRef, orderBy("createdAt"))
    );
    querySnapshot.forEach((doc) => {
      if(!(doc.data()["claimed"])){
        tempList.push(Object.assign(doc.data(), { uid: doc.id }));
      }
    });

    setDonationList(tempList);
  };

  const handleClick = (obj,uid) => {
    if(claimCart.length == 0){
      setClaimCart([obj]);
    }
    else{
      setClaimCart([...claimCart, obj]);
    }
    const newDList = donationList.filter((item)=>item.uid != uid)
    setDonationList(newDList)
  }

  const handleClaim = () => {
    window.localStorage.setItem("claimList",JSON.stringify(claimCart));
    router.push("/charity/confirmation")
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[85%] gap-y-4 mb-24 mt-8">
        <div>
          <p className="font-bold text-gray-800 text-xl">
            Nearby Food to be Claimed
          </p>
          <Link href="/charity/location">
            <p className="text-sm text-center underline">View nearby vendors</p>
          </Link>
        </div>
        {donationList.map((item) => {
          return (
            <div key={item.uid} className={`card w-full bg-white shadow-xl p-4`}>
              <div className="flex justify-between">
                <p className="text-gray-800 font-bold text-lg">
                  {item.vendor_name}
                </p>
                <button
                  className="btn btn-xs btn-circle btn-outline"
                  onClick={() => handleClick(item,item.uid)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <p>
                {item.name} x {item.amount}
              </p>
              <p>{item.createdAt.toDate().toLocaleDateString()}</p>
            </div>
          );
        })}
        <button className="mt-4 btn btn-wide btn-ghost bg-main-clr text-white font-bold" onClick={handleClaim}>Continue</button>
      </div>
    </div>
  );
};

export default CharityScreen;
