"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

const VendorScreen = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") != "vendor") {
      router.push("/");
    }
  }, [user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
        window.localStorage.removeItem("session_user");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="bg-main-clr h-screen flex flex-col justify-center items-center gap-y-4">
      <p className="text-white">Vendor Page</p>
      <button className="btn btn-active" onClick={handleLogout}>
        <p className="text-lg font-bold">Checkout</p>
      </button>
    </div>
  );
};

export default VendorScreen;
