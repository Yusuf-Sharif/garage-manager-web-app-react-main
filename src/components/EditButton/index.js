import React, { useState } from "react"
import MDButton from "../MDButton/index.js"

export default function EditButton( { sx, arrayName, saveChanges, editMode, setEditMode  } ) {
    const toggleEditMode = () => {

        // if I am in edit mode, and button clicked, that must mean, computer is saving...
            // so, run 'save' fn when 'save' clicked 
        if (editMode) {
            saveChanges(arrayName)
        }
        
        else {
            // Turn all values into input boxes so as to be edited
                // const valueSpansArray = Array.from(document.getElementsByClassName("value"))
                // valueSpansArray.forEach(value => {
                //     const valueText = value.textContent
                //     const textBox = document.createElement("input")
                //     textBox.value = valueText
                //     value.parentNode.replaceChild(textBox, value)
            }
            setEditMode(prevState => !prevState)
        }

    // toggle edit icons
    
    // map over each icon with className "record-edit-icon"

        // if editMode is true, 

            // set visibility to "hidden",

        // else set visibility to "block" (or its equivilant)

    return (
        <div>
            <MDButton sx={sx} onClick={toggleEditMode}>{ editMode ? "Save" : "Edit" }</MDButton>
        </div>
    )
}