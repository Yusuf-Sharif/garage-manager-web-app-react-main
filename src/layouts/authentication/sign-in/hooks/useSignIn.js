import { auth } from "../../../../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

function useSignIn() {
    const signIn = async (email, password) => {
        try {
          await signInWithEmailAndPassword(auth, email, password)
          console.log("Signed In!")
        }
        catch(error) {
          console.log("There was an error signing in");
          console.log(JSON.stringify(error));
          if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/user-disabled" || error.code === "auth/invalid-email") {
            const errorMsg = "Incorrect email or password";
            return errorMsg;
          }
        }

        // auth.onAuthStateChanged((user) => {
        //   if (user) {
        //     // User is signed in.
        //     console.log('User is signed in:', user);
        //   } else {
        //     // No user is signed in.
        //     console.log('User is not signed in');
        //     console.log(user)
        //   }
        // });
        
    }

    return { signIn }
}

export default useSignIn;
