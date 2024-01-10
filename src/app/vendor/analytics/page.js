"use client";

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
          <Link href="/vendor/top-overbought">
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">Top Overbought</h2>
                <p className="font-semibold text-gray-500 text-sm">Which ingredients are overpurchased?</p>
                <p className="font-semibold text-sm"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></p>
            </div>
          </Link>
        </div>

        <div className="card card-compact w-full bg-white text-black shadow-xl">
          <Link href="/vendor/stock-analysis">
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">Stock Analysis</h2>
                <p className="font-semibold text-gray-500 text-sm">Which products are undersold?</p>
                <p className="font-semibold text-sm"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></p>
            </div>
          </Link>
        </div>

        <div className="card card-compact w-full bg-white text-black shadow-xl">
          <Link href="/vendor/donation-summary">
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">Donation Summary</h2>
                <p className="font-semibold text-gray-500 text-sm">Summary on donation made.</p>
                <p className="font-semibold text-sm"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;



          

          