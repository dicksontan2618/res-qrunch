"use client"
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";

import {
  doc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";

import OrderList from "@/app/_components/OrderList";

import Swal from "sweetalert2";

const VendorScreen = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [claims, setClaims] = useState([])
  var dateStr;

  var globalTimeFormatOption = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    let ordersList = [];

    const q = query(
      collection(db, "orders"),
      where("vendor", "==", user.uid),
      orderBy("createdAt")
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
    } else {
      querySnapshot.forEach((doc) => {
        dateStr = doc.data()["createdAt"];
        let dateObject = new Date(dateStr.seconds * 1000);
        let formattedDate = dateObject.toLocaleString("en-US", globalTimeFormatOption);
        if (doc.data()["completion"] === "pending") {
          ordersList.push(Object.assign(doc.data(), { id: doc.id, formattedCreatedAt: formattedDate }));
        }
      });

      setOrders(ordersList);
    }
  };

  const getClaims = async () => {
    let claimList = [];

    const docRef = collection(db, "claimedDonations");

    const q = query(
      docRef,
      where("vendor", "==", user.uid),
      orderBy("claimedAt")
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
    } else {
      querySnapshot.forEach((doc) => {
        let dateStr = doc.data()["claimedAt"];
        let dateObject = new Date(dateStr);
        let formattedDate = dateObject.toLocaleString(
          "en-US",
          globalTimeFormatOption
        );
        
        if(!doc.data()["completed"]){
          claimList.push(
            Object.assign(doc.data(), { formattedClaimedAt: formattedDate, claimId:doc.id })
          );
        }
      });

      setClaims(claimList);
    }
  }

  const confirmClaim = (identifier) => {
    const claimRef = doc(db, "claimedDonations", identifier);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Claim",
    }).then(async (result) => {
        if (result.isConfirmed) {
            await updateDoc(claimRef, {
          completed: true
        });
        getClaims();
        Swal.fire({
          title: "Done !",
          text: "The donation was claimed.",
          icon: "success",
        }).then((result) => {
        });
      }
    });
  }

  useEffect(() => {
    getOrders();
    getClaims();
  }, []);

  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") !== "vendor") {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[85%] gap-y-2 mb-19 mt-8">
        <h2 className="self-start font-bold text-gray-800 text-xl">
          Current Orders :
        </h2>
        <OrderList orders={orders} />
      </div>
      <div className="flex flex-col items-center w-[85%] gap-y-2 mb-24 mt-5">
        <h2 className="self-start font-bold text-gray-800 text-xl">
          Donations to be Claimed :
        </h2>
        {claims.map((claim, index) => {
          return (
            <div key={index} className="flex flex-col">
              <p>{claim.formattedClaimedAt}</p>
              <div className="card card-side">
                <img
                  src={claim.img}
                  className="w-[100px] h-[100px] object-cover rounded-md ml-4 mt-12"
                ></img>
                <div className="card-body">
                  <div className="text-gray-800">
                    <p className="font-bold text-lg">{claim.name}</p>
                    <p className="font-bold text-md">Amount : {claim.amount}</p>
                    <p className="font-bold text-md text-gray-400">
                      To Claimed By : {claim.charityName}
                    </p>
                    <button className="mt-2 btn btn-ghost bg-main-clr text-white" onClick={() => confirmClaim(claim.claimId)}>Claimed</button>
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

export default VendorScreen;
