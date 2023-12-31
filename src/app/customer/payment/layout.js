"use client";
import { AuthContextProvider } from "@/context/AuthContextUser";
import BottomNavCustomer from "@/app/_components/BottomNavCustomer";

export default function CustomerLayout({ children }) {
  return (
    <AuthContextProvider>
      <div className="bg-white h-min-screen">
        <header className="flex justify-center">
          <h1 className="font-semibold text-xl">Payment</h1>
        </header>
        {children}
        <BottomNavCustomer></BottomNavCustomer>
      </div>
    </AuthContextProvider>
  );
}