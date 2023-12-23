// CustomerLayout.js
import { AuthContextProvider } from "@/context/AuthContextUser";
import Link from "next/link";

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

        <div
          id="bottom-menu"
          className="fixed bottom-0 w-full flex justify-around bg-nav-bg-clr p-4 z-10"
        >
          <ul>
            <Link className="pageSelection" href="/customer/home">
              <div className="flex flex-col gap-y-4">
                <p className="text-nav-text-clr">Home</p>
              </div>
            </Link>
          </ul>
          <ul>
            <Link className="pageSelection" href="/customer/shopping-cart">
              <div className="flex flex-col gap-y-4">
                <p className="text-nav-text-clr">Cart</p>
              </div>
            </Link>
          </ul>
          <ul>
            <Link className="pageSelection" href="/profile">
              <div className="flex flex-col gap-y-4">
                <p className="text-nav-text-clr">Profile</p>
              </div>
            </Link>
          </ul>
        </div>
      </div>
    </AuthContextProvider>
  );
}
