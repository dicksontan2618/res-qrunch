"use client";
import { AuthContextProvider } from "@/context/AuthContextVendor";
import BottomNavVendor from "@/app/_components/BottomNavVendor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function VendorMenuLayout({ children }) {
  return (
    <AuthContextProvider>
      <div className="bg-white h-min-screen">
        {/* <header className="flex justify-center">
          <h1 className="font-semibold text-xl">ResQrunch</h1>
          <button className="justify-self-end">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </header> */}
        <div className="navbar bg-main-clr flex justify-between">
          <div className="ml-8">
            <p className="text-white text-xl font-bold">ResQrunch</p>
          </div>
          <div className="mr-8">
            <Link href="/vendor/menu/add">
              <button className="btn btn-square">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </Link>
          </div>
        </div>
        {children}
        <BottomNavVendor></BottomNavVendor>
      </div>
    </AuthContextProvider>
  );
}