import React, { useRef, useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import MDInput from "./components/MDInput/index.js"

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


  const saveChanges = (setCustomerObj) => {
    // Overview - Save user's edits across re-renders:
      // Grab labels and input box values, 
      // Store them in an array, 
      // Update customerObj state with array, overwriting previous array

  // grab the grids containers of the form currently displayed
  const labelsAndValues = Array.from(document.getElementsByClassName("grid-label-and-value"))


  // inputbox.value is where the value is stored

    // For each label/value pair (each grid) store it inside an object 

  // with an array of grid containers, 
          // map over each grid container, 
          // returning an object in lablel : value format
  const newArray = labelsAndValues.map( gridContainer => {
      // grabbing the nested label paragraph
      const label = gridContainer.children[0].children[0]
      
      // Grabbing the nested inputbox
      const input = gridContainer.children[1].children[0].children[0].children[0]

      return {
          label: label.textContent,
          value: input.value
      }
  })             

  // input: array 
  // output: object property to update
  function getObjPropertyToUpdate(array) {
    const firstLabel = array[0].label

    if (firstLabel === "Name") {
      return "customerDetails"
    } 
    else if (firstLabel === "Vehicle Identification Number (VIN)") {
      return "vehicleIdentification"
    }
    else if (firstLabel === "Year of Manufacture") {
      return "vehicleDetails"
    }
    else if (firstLabel === "Test Result") {
      return "motTestDetails"
    }
    else if (firstLabel === "Categories of defects") {
      return "testResultsAndAdvisories"
    }
    else if (firstLabel === "Historical Data") {
      return "previousTestResults"
    }
    else if (firstLabel === "Details") {
      return "additionalWorkDone"
    }
    else if (firstLabel === "Test Cost") {
      return "costsAndBilling"
    }
  }

  const objPropertyToUpdate = getObjPropertyToUpdate(newArray)

  // update state with updated array 
  setCustomerObj(prevObject => ({
    ...prevObject,
    [objPropertyToUpdate]: newArray
  }))
}


export { renderTabDetails, saveChanges }