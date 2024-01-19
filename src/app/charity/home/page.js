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
  })

  const getDonationList = async () => {

    const tempList = [];

    const donationsRef = collection(db, "donations");
    const querySnapshot = await getDocs(
      query(donationsRef, orderBy("createdAt"))
    );
    querySnapshot.forEach((doc) => {
      tempList.push(doc.data());
    });

    setDonationList(tempList);
  };

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
        {donationList.map((item, index) => {
          return (
            <div key={index} className="card w-full bg-white shadow-xl p-4">
              <div className="flex justify-between">
                <p className="text-gray-800 font-bold text-lg">
                  {item.vendor_name}
                </p>
                <button className="btn btn-xs btn-circle btn-outline">
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
      </div>
    </div>
  );
};

export default CharityScreen;
