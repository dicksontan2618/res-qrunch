"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextCharity";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


const ClaimedScreen = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [claimedList, setClaimedList] = useState([]);

  useEffect(() => {
    if (
      user == null &&
      window.localStorage.getItem("session_user") != "charity"
    ) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    getClaimedList();
  }, []);

  const getClaimedList = async () => {

    let tempClaimedList = []

    const q = query(collection(db, "claimedDonations"), where("charity", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let date = new Date(doc.data()["claimedAt"]);

      // Get the components of the date
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      // Format the date as MM/DD/YY
      const formattedDate = `${month}/${day}/${year}`;

      if(!doc.data()["completed"]){
        tempClaimedList.push(
          Object.assign(doc.data(), { claimedStringDate: formattedDate })
        );
      }
    });

    setClaimedList(tempClaimedList);
  };
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[85%] gap-y-4 mb-24 mt-8">
        <div>
          <p className="font-bold text-gray-800 text-xl text-center mb-2">
            Claim Donation Items
          </p>
          <p className="text-sm text-center">
            Please collect the food on the date selected to avoid food waste
            issue.
          </p>
          <p className="text-sm text-center my-1">
            Kindly present this page during collection to verify your details.
          </p>
        </div>
        {claimedList.map((item) => {
          return (
            <div
              key={item.uid}
              className={`card w-full bg-white shadow-xl p-8`}
            >
              <div className="flex">
                <p className="text-gray-800 font-bold text-lg">
                  {item.vendor_name}
                </p>
              </div>
              <p className="my-2">
                {item.name} x {item.amount}
              </p>
              <p>Collection Date: {item.claimedStringDate}</p>
              <div className="flex justify-center gap-x-4 mt-4">
                <Link href="https://wa.link/ofntsb" target="_blank">
                  <button className="btn btn-sm btn-circle bg-white">
                    <FontAwesomeIcon icon={faPhone} />
                  </button>
                </Link>
                <Link href="/charity/location-single">
                  <button className="btn btn-sm btn-circle bg-white">
                    <FontAwesomeIcon icon={faMapPin} />
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClaimedScreen;
