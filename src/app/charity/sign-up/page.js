'use client'

import { useState } from "react";
import signUp from "@/auth/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

function charitySignUp () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignUpForm = async (event) => {

      event.preventDefault();  

      const { result, error } = await signUp(email, password);

      if(error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Some error occured. Please try again.",
        });
        return router.push("/charity/sign-up");
      }

      return router.push("/charity/home");

    }

    return (
      <div className="bg-main-clr h-screen flex justify-center items-center">
        <div className="card w-[80%] bg-white shadow-xl p-8">
          <h1 className="text-xl font-bold mb-4 text-gray-800">Charity Sign Up</h1>
          <form onSubmit={handleSignUpForm} className="form">
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
                  placeholder="charity@gmail.com"
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
              Sign up
            </button>
          </form>
          <div className="text-center text-gray-800 mt-6">
            <p>
              Have an account?{" "}
              <Link href="./sign-in">
                <span className="text-main-clr">Sign In</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
}

export default charitySignUp;