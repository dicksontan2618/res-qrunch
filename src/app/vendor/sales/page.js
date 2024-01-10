"use client";

import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

const SalesPage = () => {

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[85%] gap-y-6 mb-24 mt-12">
        <div className="card card-compact w-full bg-white text-black shadow-xl">
            <div className="card-body">
                <p className="font-semibold text-black-500 text-sm">Revenue</p>   
                <h2 className="card-title text-red-500 text-xl font-bold">RM 4554.00</h2>
                <p className="font-semibold text-sm"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></p>
            </div>
        </div>

        <div className="card card-compact w-full bg-white text-black shadow-xl">
            <div className="card-body">
                <p className="font-semibold text-black-500 text-sm">Profits</p>   
                <h2 className="card-title text-red-500 text-xl font-bold">RM 1650.00</h2>
                <p className="font-semibold text-sm"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></p>
            </div>
        </div>

        <div className="card card-compact w-full bg-white text-black shadow-xl">
            <div className="card-body">
                <p className="font-semibold text-black-500 text-sm">Sales Return</p>   
                <h2 className="card-title text-red-500 text-xl font-bold">RM 1100.00</h2>
                <p className="font-semibold text-sm"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></p>
            </div>
        </div>

        <div className="card card-compact w-full bg-white text-black shadow-xl">
            <div className="card-body">
                <p className="font-semibold text-black-500 text-sm">Purchases</p>   
                <h2 className="card-title text-red-500 text-xl font-bold">RM 1003.00</h2>
                <p className="font-semibold text-sm"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
