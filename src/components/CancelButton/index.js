import React from "react"
import MDButton from "../MDButton/index.js"

export default function CancelButton() {
    const cancelButtonStyles = {
        position: "absolute", 
        top: "20px",
        right: "20px",       
        }

    const goBack = () =>  window.history.back()

    return (
        <MDButton sx={cancelButtonStyles} onClick={goBack}>Cancel</MDButton>
    )
}