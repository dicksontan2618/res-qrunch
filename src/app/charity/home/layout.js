"use client";
import { AuthContextProvider } from "@/context/AuthContextCharity";
import BottomNavCharity from "@/app/_components/BottomNavCharity";

export default function CharityProfileLayout({ children }) {
  return (
    <AuthContextProvider>
      <div className="bg-white h-min-screen">
        <header className="flex justify-center">
          <h1 className="font-semibold text-xl">ResQrunch</h1>
        </header>
        {children}
        <BottomNavCharity></BottomNavCharity>
      </div>
    </AuthContextProvider>
  );
}
