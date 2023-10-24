import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "./AuthContext.js"
import { auth } from "../config/firebase.js"

export function signOut() {
  auth.signOut().then(() => {
      console.log("User signed out successfully!");
  }).catch((error) => {
      console.error("Error signing out: ", error);
  });    
}

export default function AuthProvider( { children } ) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const navigate = useNavigate()
    const location = useLocation()

    // Listens for auth change and updates 'currentUser' context based on auth status
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        
        if (user) {
          setCurrentUser(user); 
        } else {
          setCurrentUser(null); 
        }
        setLoading(false);
        
      });
  
      return () => unsubscribe();
    }, []);

  // Handles auto redirection to dashboard or sign in page depending on user auth status
  useEffect(() => {
    if (currentUser) {
      // User is already signed in, so redirect them to dashboard.
      if (location.pathname === "/authentication/sign-up" || location.pathname === "/authentication/sign-in") {
        navigate("/dashboard");
      }
    }

    if (!currentUser && !loading) {
      // User has clicked sign out button
      navigate("/authentication/sign-in")
    }
  }, [currentUser]);

  const value = {
        currentUser: currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}