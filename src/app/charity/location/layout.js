"use client";
import { AuthContextProvider } from "@/context/AuthContextCharity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";

export default function CharityLocLayout({ children }) {

    const router = useRouter();

    function toHomePage() {
        router.push("/charity/home");
    }

  return (
    <AuthContextProvider>
      <div className="bg-white h-min-screen">
        <header className="flex justify-center items-center">
          <h1 className="font-semibold text-xl">Your Location</h1>
            <button className="btn btn-square bg-main-clr ml-12 text-white border-white" onClick={toHomePage}>
                <FontAwesomeIcon icon={faArrowRight}/>
            </button>
        </header>
        {children}
      </div>
    </AuthContextProvider>
  );
}