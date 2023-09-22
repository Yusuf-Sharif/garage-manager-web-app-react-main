import firebaseConfig from "./firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, limit, addDoc } from "firebase/firestore"

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// Get a reference to authentication for This app
const auth = getAuth(app);

// Initialise firestore and get a reference to my firetore database
const db = getFirestore(app)

export { app, auth, db, collection, getDocs, query, limit, addDoc };
