"use client"

import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const CustomerScreen = () => {

  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(()=>{
    if(user == null){
      router.push("/");
    }
  },[user])

  return (
    <div className="bg-main-clr h-screen flex justify-center items-center">
        <p>Customer Page</p>
    </div>
  );
};

export default CustomerScreen;
