import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../config/firebase.js";

function useSignIn() {
    const signIn = async (email, password) => {
        try {
          await signInWithEmailAndPassword(auth, email, password)
        }
        catch(error) {
          if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/user-disabled" || error.code === "auth/invalid-email") {
            const errorMsg = "Incorrect email or password";
            return errorMsg;
          }
        }       
    }

    return { signIn }
}

export default useSignIn;
