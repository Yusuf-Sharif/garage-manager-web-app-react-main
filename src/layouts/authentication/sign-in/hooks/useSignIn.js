import { auth } from "../../../../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"

function useSignIn() {
    const navigate = useNavigate()

    const signIn = async (email, password) => {
        try {
          await signInWithEmailAndPassword(auth, email, password)
          console.log("Signed In!")
          navigate("/dashboard")
        }
        catch(error) {
          console.log("There was an error signing in");
        }
    }

    return { signIn }
}

export default useSignIn;
