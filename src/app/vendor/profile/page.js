"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";

const VendorProfile = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (
      user == null &&
      window.localStorage.getItem("session_user") != "vendor"
    ) {
      router.push("/");
    }
  }, [user]);

  return (
    <div>
        Vendor Profile
    </div>
  );
};

export default VendorProfile;
