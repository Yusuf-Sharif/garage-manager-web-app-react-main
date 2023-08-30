import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext.js"
import { auth } from "../config/firebase.js"
import { useNavigate } from "react-router-dom"

export default function AuthProvider( { children } ) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
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