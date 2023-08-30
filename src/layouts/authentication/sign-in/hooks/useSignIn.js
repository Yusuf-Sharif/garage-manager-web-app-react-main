import { auth } from "../../../../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"

function useSignIn() {
    const navigate = useNavigate()

    const signIn = async (email, password) => {
        try {
          await signInWithEmailAndPassword(auth, email, password)
          console.log("Signed In!")
          // navigate("/dashboard")
        }
        catch(error) {
          console.log("There was an error signing in");
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
