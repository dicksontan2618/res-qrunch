// CustomerLayout.js
import { AuthContextProvider } from "@/context/AuthContextUser";
import Link from "next/link";
import BottomNavCustomer from "@/app/_components/BottomNavCustomer";

export default function CustomerLayout({ children }) {
  return (
    <AuthContextProvider>
      <div className="flex flex-col min-h-screen bg-white relative">
        
        <header className="flex justify-start items-center p-4">
          <Link href="./home">
            <button className="text-white-500">Back</button>
          </Link>
          <h1 className="flex-grow text-center font-semibold text-xl">Profile</h1>
          <Link href="/settings">
            <button>Settings</button>
          </Link>
        </header>
        
        {children}

        <BottomNavCustomer></BottomNavCustomer>
        
      </div>
    </AuthContextProvider>
  );
}
