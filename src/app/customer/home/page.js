"use client"

import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

const CustomerScreen = () => {

  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(()=>{
    if(user == null){
      router.push("/");
    }
  },[user])

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="bg-main-clr h-screen flex flex-col justify-center items-center gap-y-4">
        <p className="text-white">Customer Page</p>
        <button className="btn btn-active" onClick={handleLogout}><p className="text-lg font-bold">Checkout</p></button>
    </div>
  );
};

export default CustomerScreen;
