import React, { useState } from "react"
import MDButton from "../MDButton/index.js"

export default function EditButton( { sx } ) {

    const [editMode, setEditMode] = useState(false)

    const toggleEditMode = () => {
        const icons = Array.from(document.getElementsByClassName("record-edit-icon"))
        icons.forEach( icon => {
            icon.style.visibility = editMode ? "hidden" : "visible"
        })

        setEditMode(prevState => !prevState)
    }

    // toggle edit icons
    
    // map over each icon with className "record-edit-icon"

        // if editMode is true, 

            // set visibility to "hidden",

        // else set visibility to "block" (or its equivilant)

    
    



    return (
        <div>
            <MDButton sx={sx} onClick={toggleEditMode}>{ editMode ? "View" : "Edit" }</MDButton>
        </div>
    )
}