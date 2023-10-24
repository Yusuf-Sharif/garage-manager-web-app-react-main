import React from "react"

import MDButton from "../MDButton/index.js"

export default function EditButton( { saveChanges, setterFn, editMode, setEditMode, docId, setError, setSuccess, setDocId } ) {
    
    function toggleEditMode() {
        const setCustomerObj = setterFn

        // Save edits
        if (editMode) {
            // Update local state and firestore
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