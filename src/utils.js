import React from "react"
import Grid from '@mui/material/Grid';
import MDInput from "./components/MDInput/index.js"
import { db, doc, updateDoc, addDoc, collection } from "./config/firebase.js"

function renderTabDetails(details, editMode, title) {

    const getXsValue = (formTitle) => {
      // if form title === "customer details then return 1"
      if (
          formTitle === "Customer Details" 
          || formTitle === "Billing & Costs"
          ) {
        return 3
      }

      else if (
                formTitle === "Historical Records"
                || formTitle === "Vehicle ID"
                || formTitle === "Vehicle Specifications"
              ) {
        return 3.3
      }

      else if (
                formTitle === "MOT Test Overview" 
              ) {
        return 4
      }
     
      else return 3.7
    }

    return details.map(detail => (
      <Grid container key={detail.label} alignItems="center" className="grid-label-and-value" style={{marginBottom: editMode ? "15px" : "25px"}}>
        <Grid item xs={getXsValue(title)}>
            <span className="labelSpan" style={{fontWeight: "bold"}}>
              {detail.label}
            </span>: { /* <-- This is the string ":" */}
        </Grid>
        {
          editMode ?
          <Grid item xs={7} style={{ /* marginLeft: "10px" */}}>
            <MDInput defaultValue={detail?.value} />
          </Grid> :
          <Grid item xs={7} style={{ /* marginLeft: "10px" */}}>
            <span>{detail?.value}</span>
          </Grid>
        }
      </Grid>
    ));
  }


  const saveChanges = (setCustomerObj, updateFirestore, docId, setError, setSuccess, setDocId) => {

    // To do: split this function into two smaller functions to simplify it (Single Responsibility):
      // saveChangesToLocalState() 
      // saveChangesToFirestore()


  // saveChangesToLocalState():
    // Purpose: Save form edits across tab switching

  // Grab the grid container of each label/input pair for selected tab
  const labelsAndValues = Array.from(document.getElementsByClassName("grid-label-and-value"))

  // Store edits of selected tab in an array 
  const newArray = labelsAndValues.map( gridContainer => {
      const label = gridContainer.children[0].children[0]
      const input = gridContainer.children[1].children[0].children[0].children[0]

      return {
          label: label.textContent,
          value: input.value
      }
  })             

  function getObjPropertyToUpdate(array) {
    const firstLabel = array[0].label

    if (firstLabel === "Name") {
      return "customerDetails"
    } 
    else if (firstLabel === "V.I.N") {
      return "vehicleDetails"
    }
    else if (firstLabel === "Test Result") {
      return "motTestDetails"
    }
    else if (firstLabel === "Test Cost") {
      return "costsAndBilling"
    }
  }

  const objPropertyToUpdate = getObjPropertyToUpdate(newArray)

  // Store unsaved edits in state for tab switching 
  setCustomerObj(prevObject => {
    const updatedObject = {
      ...prevObject,
      [objPropertyToUpdate]: newArray
    }
  
  // saveChangesToFirestore()
    // Update Firestore document if editing an existing record 
    if (updateFirestore && docId) {
      const customerObjRef = doc(db, "customers", docId)
      
      updateDoc(customerObjRef, updatedObject)
      .then(() => {
        // Render the success paragraph element.
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)

      })
      .catch(error => {
        // Render the error paragraph element.
        setError(error)
      })
    }

    // Create new Firestore document if record doesn't exist
    else if (updateFirestore && !docId) {
      addDoc(collection(db, "customers"), updatedObject)
        .then(newDocumentRef => {
          const newDocumentId = newDocumentRef.id

          // Set docId to newDocumentId to allow immediate edits post-save and prevent duplicate record creation.
          setDocId(newDocumentId)

          // Render the success paragraph element
          setSuccess(true)
  
          setTimeout(() => setSuccess(false), 3000)
  
        })
        .catch(error => {  
          // Render the error paragraph element
          setError(error)
        })
    }

    return updatedObject

  })

  

}


export { renderTabDetails, saveChanges }