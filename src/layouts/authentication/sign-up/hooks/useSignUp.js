import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../../../config/firebase.js";

function useSignUp() {
    const signUp = async (name, email, password) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        console.log("created account!")

        // Update user's display name to name specified in sign up form 
        await updateProfile(user, {
          displayName: name
        })

        console.log("User registered with display name:", user.displayName);

        
      }
      catch(err) {
        console.error("account creation unsuccessful");
        console.log(err.message);
      }
    };

    return { signUp };
  }

  export default useSignUp;