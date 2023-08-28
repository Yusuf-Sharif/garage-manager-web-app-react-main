import firebaseConfig from "./firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// Get a reference to authentication for This app
const auth = getAuth(app);

export { auth };
