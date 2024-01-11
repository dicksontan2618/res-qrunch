"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextCharity";
import { useRouter } from "next/navigation";

const CharityScreen = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (
      user == null &&
      window.localStorage.getItem("session_user") != "charity"
    ) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[85%] gap-y-4 mb-24 mt-12">
        <p>Charity Home Page!</p>
      </div>
    </div>
  );
};

export default CharityScreen;
