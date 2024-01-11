"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app, auth, db } from "@/utils/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function createCharity(charity) {
      const docRef = doc(db, "charities", charity.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Charity existed in database.");
      } else {
        await setDoc(doc(db, "charities", charity.uid), {
          email: charity.email,
        });
        console.log("Charity document written.");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        window.localStorage.setItem("session_user", "charity");
        createCharity(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="bg-white h-screen flex justify-center items-center">
          <h1 className="text-4xl font-bold text-gray-800">Loading...</h1>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
