import { auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function signUp(email, password) {
    let result = null;
    let error = null;

    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    }
    catch (e) {
        error = e;
    }

    return  {result, error};
}
