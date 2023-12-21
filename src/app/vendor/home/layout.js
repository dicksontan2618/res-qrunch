"use client";
import { AuthContextProvider } from "@/context/AuthContextUser";

export default function VendorLayout({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
