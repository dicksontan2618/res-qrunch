"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextCharity";
import { useRouter } from "next/navigation";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

import Swal from "sweetalert2";

const ConfirmationScreen = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [claimList, setClaimList] = useState([]);
  const [currentDate,setCurrentDate] = useState("");

  useEffect(() => {
    if (
      user == null &&
      window.localStorage.getItem("session_user") != "charity"
    ) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    getClaimList();
    getCurrentDate();
  }, []);

  const getClaimList = () => {
    let tempClaimList = JSON.parse(window.localStorage.getItem("claimList"));
    tempClaimList.forEach((item) => {
        let date = new Date(item.createdAt.seconds * 1000);

        // Get the components of the date
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        // Format the date as MM/DD/YY
        const formattedDate = `${month}/${day}/${year}`;

        Object.assign(item,{stringDate:formattedDate})
    })
    setClaimList(tempClaimList);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();

    // Extract the components of the date
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = currentDate.getDate().toString().padStart(2, "0");

    // Format the date as yyyy-mm-dd
    const formattedCurrentDate = `${year}-${month}-${day}`;

    setCurrentDate(formattedCurrentDate)

  }

  const confirm = () => {
    let tempClaimList = claimList;
    let claimedIdentifier = [];
    tempClaimList.forEach(async (item)=>{
        Object.assign(item, {
          claimedAt: document.getElementById("claim-time").value,
          charity:user.uid,
        });
        claimedIdentifier.push(item.uid);
        await addDoc(collection(db, "claimedDonations"), item);
    })
    claimedIdentifier.forEach(async (identifier) => {
        const itemRef = doc(db, "donations", identifier);
        await setDoc(itemRef, { claimed: true }, { merge: true });
    })
    setClaimList(tempClaimList);
  }

  const handleConfirmation = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed with Claim",
    }).then((result) => {
      if (result.isConfirmed) {
        confirm();
        Swal.fire({
          title: "Donation Claimed !",
          text: "Your claim has been processed.",
          icon: "success",
        }).then((result) => {
          router.push("/charity/home");
        });
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[85%] gap-y-4 mb-24 mt-8">
        <div>
          <p className="font-bold text-gray-800 text-xl">Confirmation</p>
        </div>
        {claimList.map((item) => {
          return (
            <div
              key={item.uid}
              className={`card w-full bg-white shadow-xl p-4`}
            >
              <div className="flex justify-between">
                <p className="text-gray-800 font-bold text-lg">
                  {item.vendor_name}
                </p>
              </div>
              <p>
                {item.name} x {item.amount}
              </p>
              <p>{item.stringDate}</p>
            </div>
          );
        })}
        <label htmlFor="claim-time">Choose a time for collection:</label>
        <input
          type="datetime-local"
          id="claim-time"
          name="claim-time"
          min={currentDate+"T00:00"}
        />
        <button
          className="mt-4 btn btn-wide btn-ghost bg-main-clr text-white font-bold"
          onClick={handleConfirmation}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
