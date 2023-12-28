"use client";
import { AuthContextProvider } from "@/context/AuthContextVendor";
import BottomNavVendor from "@/app/_components/BottomNavVendor";

export default function VendorAddMenuLayout({ children }) {
  return (
    <AuthContextProvider>
      <div className="bg-white h-min-screen">
        {/* <header className="flex justify-center">
          <h1 className="font-semibold text-xl">ResQrunch</h1>
        </header> */}
        {children}
        <BottomNavVendor></BottomNavVendor>
      </div>
    </AuthContextProvider>
  );
}