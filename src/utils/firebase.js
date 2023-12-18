// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeEbRikKGQsHp_8piHV2YNVs3TjV5ZR3U",
  authDomain: "res-qrunch.firebaseapp.com",
  projectId: "res-qrunch",
  storageBucket: "res-qrunch.appspot.com",
  messagingSenderId: "1012857263644",
  appId: "1:1012857263644:web:794ca8a0039f47df4db1d9",
  measurementId: "G-7VKGQ3K3SM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
