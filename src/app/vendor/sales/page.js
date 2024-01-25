"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillWave, faWarehouse, faMoneyBillTransfer, faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const SalesPage = () => {

  const { user } = useAuthContext();
  const router = useRouter();

  const [totalSales, setTotalSales] = useState(0.00)
  const [totalDonations, setTotalDonations] = useState(0.00)

  const getSalesDetails = async () => {

    let tempSales = [];
  
    const q = query(
      collection(db, "orders"),
      where("vendor", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((doc) => {
      tempSales.push(doc.data()["amount"]*Number(doc.data()["price"]));
    });

    let tempTotalSales = (tempSales.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2)
    
    setTotalSales(tempTotalSales);
  };

  const getDonationsDetails = async () => {

    let tempDonations = [];

    const q = query(collection(db, "donations"), where("vendor", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((doc) => {
      tempDonations.push(doc.data()["amount"] * (Number(doc.data()["price"])/2.00));
    });

    let tempTotalDonations = tempDonations
      .reduce((partialSum, a) => partialSum + a, 0)
      .toFixed(2);

    setTotalDonations(tempTotalDonations);
  };

  useEffect(() => {
    if (
      user == null &&
      window.localStorage.getItem("session_user") !== "vendor"
    ) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    getSalesDetails();
    getDonationsDetails();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[75%] gap-y-6 mb-24 mt-12">
        <div className="card card-compact flex-row w-full bg-white text-black shadow-xl">
          <p className="mt-7 ml-8 font-semibold"><FontAwesomeIcon icon={faMoneyBillWave} style={{fontSize: "32px"}}/></p>
          <div className="card-body flex justify-between">
            <div className="text-right">
              <p className="font-semibold text-black-500 text-sm">Sales</p>
              <h2 className=" text-green-500 text-xl font-bold">RM {totalSales}</h2>
            </div>
          </div>
        </div>

        <div className="card card-compact flex-row w-full bg-white text-black shadow-xl">
          <p className="mt-6 ml-8 font-semibold"><FontAwesomeIcon icon={faHandHoldingHeart} style={{fontSize: "32px"}}/></p>
          <div className="card-body flex justify-between">
            <div className="text-right">
              <p className="font-semibold text-black-500 text-sm">Sales (From Donations)</p>
              <h2 className=" text-green-500 text-xl font-bold">RM {totalDonations}</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SalesPage;
