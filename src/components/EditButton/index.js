import React, { useState } from "react"
import MDButton from "../MDButton/index.js"
import { db, doc, updateDoc, addDoc } from "../../config/firebase.js"
import { useSearchParams } from "react-router-dom"

export default function EditButton( { saveChanges, setterFn, editMode, setEditMode, docId, setError, setSuccess } ) {
    const [searchParams, setSearchParams] = useSearchParams()
    
    
    const toggleEditMode = () => {

        const setCustomerObj = setterFn
        // If editMode is true and 'newRecord' is in url, add doc to firestore 
        if (editMode && searchParams.has("newRecord")) {
            console.log("adding whole new doc")
            saveChanges(setCustomerObj, true, docId, setError, setSuccess, true)
        }

        // if I am in edit mode, and button clicked, that must mean, computer is saving...
            // so, run 'save' fn when 'save' clicked 
        else if (editMode) {
            console.log("updating existing doc...")
            // Updates local state and firestore
            saveChanges(setCustomerObj, true, docId, setError, setSuccess)
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