import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"

import MDButton from "../MDButton/index.js"

export default function EditButton( { saveChanges, setterFn, editMode, setEditMode, docId, setError, setSuccess, setDocId } ) {
    const [searchParams, setSearchParams] = useSearchParams()
    
    function toggleEditMode() {

        const setCustomerObj = setterFn
        // If editMode is true and 'newRecord' is in url, add doc to firestore 
        {
            // if (editMode && searchParams.has("newRecord")) {
            //     console.log("adding whole new doc")
            //     saveChanges(setCustomerObj, true, docId, setError, setSuccess)
            // }    
        }

        // if I am in edit mode, and button clicked, that must mean, computer is saving...
            // so, run 'save' fn when 'save' clicked 
        if (editMode) {
            // Updates local state and firestore
            saveChanges(setCustomerObj, true, docId, setError, setSuccess, setDocId)
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