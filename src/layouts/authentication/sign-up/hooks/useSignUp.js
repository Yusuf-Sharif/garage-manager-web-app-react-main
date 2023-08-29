import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../../config/firebase.js";
import { useNavigate } from "react-router-dom"

function useSignUp() {
    const navigate = useNavigate()

    const signUp = async (email, password) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        console.log("created account!")
        navigate("/dashboard")
      }
      catch(err) {
        console.error("account creation unsuccessful");
        console.log(err.message);
      }
    };

    return { signUp };
  }

  export default useSignUp;