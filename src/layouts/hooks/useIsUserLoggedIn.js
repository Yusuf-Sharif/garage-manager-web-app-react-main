import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function useIsUserLoggedIn() {
    const [authStatus, setAuthStatus] = useState("loading")
    const navigate = useNavigate()
    
    useEffect( () => {
        const checkAuthentication = () => {
        // if user signed in
        const user = false

        if (user) {
            console.log("user signed in")
            setAuthStatus(true)
        }
        
        else {
            // redirect user to log in page 
            setAuthStatus(null)
            console.log("navigating")
            navigate("/authentication/sign-in")
        } 
    }

    checkAuthentication()

    }, [navigate])

    return { authStatus }
}