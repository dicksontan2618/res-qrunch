import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default async function signIn(email, password) {
  let result = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
