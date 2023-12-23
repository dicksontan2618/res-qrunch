"use client"

import {createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app, auth, db } from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   async function createCustomer(customer) {
     const docRef = doc(db, "customers", customer.uid);
     const docSnap = await getDoc(docRef);

     if (docSnap.exists()) {
       console.log("Customer existed in database.");
     } else {
       await setDoc(doc(db, "customers", customer.uid), {
         email: customer.email,
       });
       console.log("Customer document written.");
     }
   }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        window.localStorage.setItem(
          "session_user",
          "user"
        );
        createCustomer(user);
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
