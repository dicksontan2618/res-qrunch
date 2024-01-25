"use client";

import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingHeart, faMagnifyingGlassChart, faMoneyBillTrendUp, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const AnalyticsPage = () => {

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[85%] gap-y-6 mb-24 mt-12">

        <Link className="w-full" href="/vendor/sales">
          <div className="card card-compact flex-row w-full bg-white text-black shadow-xl">
            <div className="card-body flex justify-between">
              <div className="text-left">
                <h2 className="card-title text-xl font-bold">Sales</h2>
                <p className="font-semibold text-gray-500 text-sm">How much do you earn for this week?</p>
              </div>
            </div>
            <p className="mt-7 ml-8 mr-8 font-semibold"><FontAwesomeIcon icon={faMoneyBillTrendUp} style={{fontSize: "32px"}}/></p>
          </div>
        </Link>

        <Link className="w-full" href="/vendor/top-leftover">
          <div className="card card-compact flex-row w-full bg-white text-black shadow-xl">
            <div className="card-body flex justify-between">
              <div className="text-left">
                <h2 className="card-title text-xl font-bold">Top Leftover Products</h2>
                <p className="font-semibold text-gray-500 text-sm">Which products have the highest amount of leftovers?</p>
              </div>
            </div>
            <p className="mt-6 ml-8 mr-8 font-semibold"><FontAwesomeIcon icon={faPenToSquare} style={{fontSize: "32px"}}/></p>
          </div>
        </Link>

        <Link className="w-full" href="/vendor/stock-analysis">
          <div className="card card-compact flex-row w-full bg-white text-black shadow-xl">
            <div className="card-body flex justify-between">
              <div className="text-left">
                <h2 className="card-title text-xl font-bold">Stock Analysis</h2>
                <p className="font-semibold text-gray-500 text-sm">Which ingredients should be reduce when restocking?</p>
              </div>
            </div>
            <p className="mt-6 ml-8 mr-8 font-semibold"><FontAwesomeIcon icon={faMagnifyingGlassChart} style={{fontSize: "32px"}} /></p>
          </div>
        </Link>

        <Link className="w-full" href="/vendor/donation-summary">
          <div className="card card-compact flex-row w-full bg-white text-black shadow-xl">
            <div className="card-body flex justify-between">
              <div className="text-left">
                <h2 className="card-title text-xl font-bold">Donation Summary</h2>
                <p className="font-semibold text-gray-500 text-sm">Summary on donation made.</p>
              </div>
            </div>
            <p className="mt-6 ml-8 mr-8 font-semibold"><FontAwesomeIcon icon={faHandHoldingHeart} style={{fontSize: "32px"}}/></p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AnalyticsPage;



          

          