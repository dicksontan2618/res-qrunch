"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

const RedeemPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [points, setPoints] = useState(1000);
  const redeemItems = [
    {
      img: "/redeem-item-1.webp",
      name: "Eco Tote Bag",
      points_req: 100,
    },
    {
      img: "/redeem-item-2.webp",
      name: "Eco Thermo Flask",
      points_req: 300,
    },
    {
      img: "/redeem-item-3.webp",
      name: "Eco Stationary Case",
      points_req: 500,
    },
  ];

// TODO: Implement after checkout is done
  const getUserPoints = () => {
    
  };

  const redeem = (point_req) => {
    if(points < point_req){
        Swal.fire({
          title: "Not Enough Points !",
          text: "Collect more points to redeem it !",
          icon: "error",
        });
    }
    else{
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
          Available Points : {points}
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