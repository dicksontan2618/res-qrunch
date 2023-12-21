"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const VendorScreen = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="bg-main-clr h-screen flex justify-center items-center">
      <p>Vendor Page</p>
    </div>
  );
};

export default VendorScreen;
