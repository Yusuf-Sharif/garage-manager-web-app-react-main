import { auth } from "../../../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
// function to run when sign in btn clicked
// checks to see if the email and password are valid - takes email and pass as parameters

function authUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentail) => console.log("Signed in!"))
    .catch((error) => console.log("There was an error signing in"));
}

export default authUser;
