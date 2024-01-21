"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextCharity";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

import Swal from "sweetalert2";

const CharityProfile = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [charityName, setCharityName] = useState("");
  const [charityAddress, setCharityAddress] = useState("");

  // function to initialize vendor profile
  async function initCharityProfile(charity) {
    const docRef = doc(db, "charities", charity.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (
        docSnap.data()["username"] &&
        docSnap.data()["address"]
      ) {
        setCharityName(docSnap.data()["username"]);
        setCharityAddress(docSnap.data()["address"]);
      } else {
        setCharityName("No data");
        setCharityAddress("No data");
      }
    }
  }

  // function that invoked when user submit edit profile form
  const handleEditProfileForm = async (event) => {
    event.preventDefault();

    await setDoc(
      doc(db, "charities", user.uid),
      {
        username: charityName,
        address: charityAddress,
      },
      { merge: true }
    );

    Swal.fire({
      title: "Edit Success!",
      text: "Profile Details Edited Successfully!",
      icon: "success",
    });
  };

  // function invoked when user logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
        window.localStorage.removeItem("session_user");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    if (
      user == null &&
      window.localStorage.getItem("session_user") != "charity"
    ) {
      router.push("/");
    } else {
      initCharityProfile(user);
    }
  }, [user]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[80%] gap-y-8 mt-12">
        <div>
          <form onSubmit={handleEditProfileForm} className="form">
            <div className="w-full my-1">
              <label className="text-gray-800 font-semibold">
                <p>Name</p>
                <input
                  type="text"
                  onChange={(e) => setCharityName(e.target.value)}
                  placeholder={charityName}
                  className="input input-bordered w-full max-w-xs bg-white"
                />
              </label>
            </div>
            <div className="w-full my-1">
              <label className="text-gray-800 font-semibold">
                <p>Address</p>
                <textarea
                  onChange={(e) => setCharityAddress(e.target.value)}
                  className="textarea textarea-bordered bg-white"
                  placeholder={charityAddress}
                ></textarea>
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 text-black font-bold rounded-xl border-2 border-gray-800 p-2"
            >
              Edit Profile
            </button>
          </form>
        </div>
        <button className="btn btn-active mb-24" onClick={handleLogout}>
          <p className="text-lg font-bold">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default CharityProfile;
