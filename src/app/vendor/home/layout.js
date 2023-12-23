"use client";
import { AuthContextProvider } from "@/context/AuthContextVendor";

export default function VendorLayout({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
