import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext.js"
import { auth } from "../config/firebase.js"
import { useNavigate, useLocation } from "react-router-dom"

export default function AuthProvider( { children } ) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    console.log("AuthContextProvider Render")

    // set up listener for logged in change 
    useEffect(() => {
      // This sets up the listener and provides the cleanup method all in one!
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user); // User is logged in
        } else {
          setCurrentUser(null); // User is logged out
        }
        setLoading(false);
      });
  
      // Cleanup the listener on unmount
      return () => unsubscribe();
    }, []);

  // This useEffect will run whenever `currentUser` changes.
  // If user is logged in, and on sign in/sign up pages, redirect them to Dashboard page
  useEffect(() => {
    if (currentUser) {
      // Add logic for detecting if the current URL is the sign in or sign up page.
      // If true, navigate to dashboard.
      if (location.pathname === "/authentication/sign-up" || location.pathname === "/authentication/sign-in") {
        console.log("user is logged in and I am ready to redirect them to dashboard!")
        navigate("/dashboard");
      }
    }
  }, [currentUser, location.pathname]);

    console.log("AuthContextProvider, Current User:")
    console.log(currentUser)

    const value = {
        currentUser: currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}