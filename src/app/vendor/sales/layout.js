"use client";
import { AuthContextProvider } from "@/context/AuthContextVendor";
import BottomNavVendor from "@/app/_components/BottomNavVendor";
import Link from "next/link";

export default function VendorProfileLayout({ children }) {
  return (
    <AuthContextProvider>
      <div className="flex flex-col min-h-screen bg-white relative">
        
        <header className="flex justify-start items-center p-4">
          <Link href="./analytics">
            <button className="text-white-500">Back</button>
          </Link>
          <h1 className="flex-grow text-center font-semibold text-xl">Sales</h1>
        </header>
        
        {children}

        <BottomNavVendor></BottomNavVendor>
      </div>
    </AuthContextProvider>
  );
}