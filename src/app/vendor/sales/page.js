"use client";

import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillWave, faWarehouse, faMoneyBillTransfer, faSackDollar } from "@fortawesome/free-solid-svg-icons";

const SalesPage = () => {

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[75%] gap-y-6 mb-24 mt-12">
        <div className="card card-compact flex-row w-full bg-white text-black shadow-xl">
          <p className="mt-7 ml-8 font-semibold"><FontAwesomeIcon icon={faMoneyBillWave} style={{fontSize: "32px"}}/></p>
          <div className="card-body flex justify-between">
            <div className="text-right">
              <p className="font-semibold text-black-500 text-sm">Revenue</p>
              <h2 className=" text-red-500 text-xl font-bold">RM 4554.00</h2>
            </div>
          </div>
        </div>

        <div className="card card-compact flex-row w-full bg-white text-black shadow-xl">
          <p className="mt-6 ml-8 font-semibold"><FontAwesomeIcon icon={faSackDollar} style={{fontSize: "32px"}}/></p>
          <div className="card-body flex justify-between">
            <div className="text-right">
              <p className="font-semibold text-black-500 text-sm">Profits</p>
              <h2 className=" text-red-500 text-xl font-bold">RM 1650.00</h2>
            </div>
          </div>
        </div>

        <div className="card card-compact flex-row w-full bg-white text-black shadow-xl">
          <p className="mt-6 ml-8 font-semibold"><FontAwesomeIcon icon={faMoneyBillTransfer} style={{fontSize: "32px"}}/></p>
          <div className="card-body flex justify-between">
            <div className="text-right">
              <p className="font-semibold text-black-500 text-sm">Sales Return</p>
              <h2 className=" text-red-500 text-xl font-bold">RM 1100.00</h2>
            </div>
          </div>
        </div>

        <div className="card card-compact flex-row w-full bg-white text-black shadow-xl">
          <p className="mt-6 ml-8 font-semibold"><FontAwesomeIcon icon={faWarehouse} style={{fontSize: "32px"}}/></p>
          <div className="card-body flex justify-between">
            <div className="text-right">
              <p className="font-semibold text-black-500 text-sm">Purchases</p>
              <h2 className=" text-red-500 text-xl font-bold">RM 1003.00</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
