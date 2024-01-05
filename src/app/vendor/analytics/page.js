"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

const AnalyticsPage = () => {

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[85%] gap-y-6 mb-24 mt-12">
        <div className="card card-compact w-full bg-white text-black shadow-xl">
          <Link href="/vendor/sales">
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">Sales</h2>
                <p className="font-semibold text-gray-500 text-sm">How much do you earn for this week?</p>
                <p className="font-semibold text-sm"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></p>
            </div>
          </Link>
        </div>

        <div className="card card-compact w-full bg-white text-black shadow-xl">
          <Link href="/vendor/top-selling">
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">Top Selling</h2>
                <p className="font-semibold text-gray-500 text-sm">Which one is the hotest best seller?</p>
                <p className="font-semibold text-sm"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></p>
            </div>
          </Link>
        </div>

        <div className="card card-compact w-full bg-white text-black shadow-xl">
          <Link href="/vendor/stock-analysis">
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">Stock Analysis</h2>
                <p className="font-semibold text-gray-500 text-sm">Which stock is undersold?</p>
                <p className="font-semibold text-sm"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></p>
            </div>
          </Link>
        </div>

        <div className="card card-compact w-full bg-white text-black shadow-xl">
  <Link href="/vendor/donation-summary">
    <div className="card-body flex items-center">
      <div>
        <h2 className="card-title text-xl font-bold">Donation Summary</h2>
        <p className="font-semibold text-gray-500 text-sm">Summary on donation made.</p>
      </div>
      <div className="ml-auto">
        <p className="font-semibold text-sm">
          <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
        </p>
      </div>
    </div>
  </Link>
</div>


      </div>
    </div>
  );
};

export default AnalyticsPage;



          

          