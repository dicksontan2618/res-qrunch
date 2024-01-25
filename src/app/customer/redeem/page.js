"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

import Swal from "sweetalert2";

const RedeemPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [points, setPoints] = useState(0);
  const redeemItems = [
    {
      img: "/redeem-item-1.webp",
      name: "Eco Tote Bag",
      points_req: 1000,
    },
    {
      img: "/redeem-item-2.webp",
      name: "Eco Thermo Flask",
      points_req: 3000,
    },
    {
      img: "/redeem-item-3.webp",
      name: "Eco Stationary Case",
      points_req: 5000,
    },
  ];

  const getUserPoints = async () => {
    const docRef = doc(db, "customers", user.uid);
    const docSnap = await getDoc(docRef);

    setPoints(docSnap.data()["points"]);
  };

  const updateUserPoints = (point_req) => {
    const cusRef = doc(db, "customers", user.uid);
    setDoc(
      cusRef,
      { points: points - point_req },
      { merge: true }
    );
    setPoints(points-point_req);
  }

  const redeem = (point_req) => {
    if(points < point_req){
        Swal.fire({
          title: "Not Enough Points !",
          text: "Collect more points to redeem it !",
          icon: "error",
        });
    }
    else{
      updateUserPoints(point_req);
      Swal.fire({
        title: "Redeem Success !",
        text: "Your redeemed item will be sent to your registered address in 3-5 working days.",
        icon: "success",
      });
    }
  };

  useEffect(() => {
    getUserPoints();
  }, []);

  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") != "user") {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[85%] gap-y-6 mb-24 mt-12">
        <p className="text-gray-800 font-bold text-xl">
          Redeem your points for goodies!
        </p>
        <p className="text-gray-800 font-semibold">
          Available Points : {points.toFixed(0)}
        </p>
        {redeemItems.map((redeemItem, index) => {
            return (
              <div
                key={index}
                className="w-full flex gap-x-4 shadow-md h-36 items-center"
              >
                <img
                  src={redeemItem.img}
                  className="w-[100px] h-[100px] object-cover rounded-md ml-4"
                ></img>
                <div className="w-full">
                  <div className="text-gray-800">
                    <p className="font-bold text-lg">{redeemItem.name}</p>
                    <p className="font-semibold text-sm text-gray-500">
                      Points Required : {redeemItem.points_req}
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      className="btn btn-md btn-ghost rounded-xl bg-blue-400 text-white"
                      onClick={() => redeem(redeemItem.points_req)}
                    >
                      Redeem
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RedeemPage;
