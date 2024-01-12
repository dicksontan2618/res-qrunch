"use client";

import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

const DonationSummaryPage = () => {

  return (
    <div className="flex flex-col items-center text-left">
        <h1 className="mt-8 text-black text-xl font-bold text-left">Summary On Products</h1>
      <div className="flex flex-col items-center w-[85%] gap-y-6 mb-24 mt-10">
        <div className="card card-compact w-full bg-white text-black shadow-xl">
          <Link href="/vendor/donation-summary-daily">
            <div className="card-body">
                <h2 className="card-title text-red-500 text-xl font-bold">Daily Donation</h2>
            </div>
          </Link>
        </div>

        <div className="card card-compact w-full bg-white text-black shadow-xl">
          <Link href="/vendor/donation-summary-weekly">
            <div className="card-body">
                <h2 className="card-title text-red-500 text-xl font-bold">Weekly Donation</h2>
            </div>
          </Link>
        </div>

        <div className="card card-compact w-full bg-white text-black shadow-xl">
          <Link href="/vendor/donation-summary-monthly">
            <div className="card-body">
                <h2 className="card-title text-red-500 text-xl font-bold">Monthly Donation</h2>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DonationSummaryPage;



          

          