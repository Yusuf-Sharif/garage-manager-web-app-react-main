import React, { useState } from "react"
import MDButton from "../MDButton/index.js"

export default function EditButton( { saveChanges, setterFn, editMode, setEditMode  } ) {
    const toggleEditMode = () => {

        const setCustomerObj = setterFn

        // if I am in edit mode, and button clicked, that must mean, computer is saving...
            // so, run 'save' fn when 'save' clicked 
        if (editMode) {
            saveChanges(setCustomerObj)
        }
        
        setEditMode(prevState => !prevState)

        }
    
    const editButtonStyles = {
        position: "absolute", 
        top: "20px",
        right: editMode ? "130px" : "20px",
        color: editMode ? "red" : "",
        }

    return (
        <div>
            <MDButton sx={editButtonStyles} onClick={toggleEditMode}>{ editMode ? "Save" : "Edit" }</MDButton>
        </div>
    )
}