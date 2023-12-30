"use client";
import { AuthContextProvider } from "@/context/AuthContextUser";
import BottomNavCustomer from "@/app/_components/BottomNavCustomer";
import Link from "next/link";

export default function CustomerLayout({ children }) {
  return (
    <AuthContextProvider>
      <div className="flex flex-col h-min-screen bg-white relative">
        
        <header className="flex justify-start items-center p-4">
          <Link href="./home">
            <button className="text-white-500">Back</button>
          </Link>
          <h1 className="flex-grow text-center font-semibold text-xl">ResQrunch</h1>
        </header>
        {children}
        <BottomNavCustomer></BottomNavCustomer>
      </div>
    </AuthContextProvider>
  );
}

// Put it here for future ref
