"use client";

import { useState, useEffect } from "react";
import signIn from "@/auth/signin";
import { useRouter } from "next/navigation";
import Link from "next/link";

function customerSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignInForm = async (event) => {

    event.preventDefault();  

    const { result, error } = await signIn(email, password);

    // TODO: Add display error
    if (error) {
      return console.log(error);
    }

    return router.push("/customer/home");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      window.localStorage.setItem(
        "curLoc",
        JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
    });
  }, []);

  return (
    <div className="bg-main-clr h-screen flex justify-center items-center">
      <div className="card w-[80%] bg-white shadow-xl p-8">
        <h1 className="text-xl font-bold mb-4 text-gray-800">Customer Login</h1>
        <form onSubmit={handleSignInForm} className="form">
          <div className="w-full my-1">
            <label htmlFor="email" className="text-gray-800 font-semibold">
              <p>Email</p>
              <input
                className="bg-white border rounded-md p-2 text-sm"
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="user@gmail.com"
              />
            </label>
          </div>
          <div className="my-1">
            <label htmlFor="password" className="text-gray-800 font-semibold">
              <p>Password</p>
              <input
                className="bg-white border rounded-md p-2 text-sm"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 text-black font-bold rounded-xl border-2 border-gray-800 p-2"
          >
            Login
          </button>
        </form>
        <div className="text-center text-gray-800 mt-6">
          <p>
            No account?{" "}
            <Link href="./sign-up">
              <span className="text-main-clr">Sign Up</span>
            </Link>
          </p>
          <Link href="../vendor/sign-in">
            <p className="underline">Are you a vendor?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default customerSignIn;
