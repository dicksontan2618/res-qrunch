"use client";
import { AuthContextProvider } from "@/context/AuthContext";

export default function CustomerLayout({ children }) {
  return (
      <AuthContextProvider>{children}</AuthContextProvider>
  );
}
