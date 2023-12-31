import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../AuthContext/AuthContext.js"

export function useNavigateToSignInPage() {
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate() 

    useEffect( () => {
        if (!currentUser) {
            navigate("/authentication/sign-in?error=you+must+log+in+first") 
        }       
    }, [])
}