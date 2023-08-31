import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../../config/firebase.js";

function useSignUp() {
    const signUp = async (email, password) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        console.log("created account!")
      }
      catch(err) {
        console.error("account creation unsuccessful");
        console.log(err.message);
      }
    };

    return { signUp };
  }

  export default useSignUp;