"use client";
import { AuthContextProvider } from "@/context/AuthContextUser";

export default function CustomerLayout({ children }) {
  return (
      <AuthContextProvider>{children}</AuthContextProvider>
  );
}
