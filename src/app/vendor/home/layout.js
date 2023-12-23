"use client";
import { AuthContextProvider } from "@/context/AuthContextVendor";
import Link from "next/link";

export default function VendorLayout({ children }) {
  return <AuthContextProvider>
    <div className="bg-white h-screen">
        <header className="flex justify-center">
          <h1 className="font-semibold text-xl">ResQrunch</h1>
        </header>
        {children}
        <div
          id="bottom-menu"
          className="fixed bottom-0 flex justify-around bg-nav-bg-clr"
        >
          <ul>
            <Link className="pageSelection" href="./home">
              <div className="flex flex-col gap-y-4">
                <p className="text-nav-text-clr">Home</p>
              </div>
            </Link>
          </ul>
          <ul>
            <Link className="pageSelection" href="./shopping-cart">
              <div className="flex flex-col gap-y-4">
                <p className="text-nav-text-clr">Menu</p>
              </div>
            </Link>
          </ul>
          <ul>
            <Link className="pageSelection" href="../profile">
              <div className="flex flex-col gap-y-4">
                <p className="text-nav-text-clr">Profile</p>
              </div>
            </Link>
          </ul>
        </div>
      </div>
    </AuthContextProvider>;
}
