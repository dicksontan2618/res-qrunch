"use client";
import { AuthContextProvider } from "@/context/AuthContext";

export default function VendorLayout({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
