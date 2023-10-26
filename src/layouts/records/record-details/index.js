import React, { useState, useEffect } from "react"
import { useParams, useSearchParams, useLocation } from "react-router-dom"

import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import EditButton from "../../../components/EditButton/index.js"
import CancelButton from "../../../components/CancelButton/index.js"
import TabFormDisplay from "../../../components/TabFormDisplay/index.js"

import { saveChanges } from "../../../utils.js"
import { db, collection, getDocs } from "../../../config/firebase.js"

import { Tabs, Tab, Box } from "@mui/material"
import Grid from '@mui/material/Grid';

// Importing 'Current User' Context
import { useContext } from "react"
import { AuthContext } from "../../../AuthContext/AuthContext"

// Hook to protect non-signed-in access
import { useNavigateToSignInPage } from "../../authentication/hooks/useNavigateToSignInPage.js"

export default function RecordDetails() {

    // Handling redirection to sign in if user not logged in
    useNavigateToSignInPage()
    // 

    const [value, setValue] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const [editMode, setEditMode] = useState(searchParams.has("editMode"))
    const [customerObj, setCustomerObj] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [docId, setDocId] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const { id } = useParams()
    const location = useLocation()
    const { dateRecordFormat, timeRecordFormat } = location.state || {}

    const { customerDetails,
      vehicleDetails,
      motTestDetails,
      costsAndBilling,
     } = customerObj || {} // In case firestore hasnt returned the customer object yet, fall back to empty object to prevent onscreen error
            
    // Fetch 'new record template' or customer data based on the URL parameter.
    useEffect(() => {

      // The function currently handles multiple responsibilities due to its reliance on async data. A more modular approach is sought in the future.
      async function getCustomersArray() {
      
      // Fetch all customer records from firestore
      const customersArray = await getDocs(collection(db, "customers"))
      
      // Update customerObj state with selected customer's object data
      setCustomerObj(customersArray.docs[id].data())

      // Set selected customer's Firestore document id in state
      setDocId(customersArray.docs[id].id)

    }

    // Function retrieves a customerObj template from Firestore, consisting of labels with no values.
    async function getRecordTemplate() {
      const recordTemplateFirestoreObject = await getDocs(collection(db, "record-template"))
      const recordTemplateObject = recordTemplateFirestoreObject.docs[0].data()

      // Prefill the template object with Date and Time if they exist in the location state.
      if (dateRecordFormat && timeRecordFormat) {
        recordTemplateObject.customerDetails[4].value = dateRecordFormat
        
        if (timeRecordFormat != "12:00 AM") {
          recordTemplateObject.customerDetails[5].value = timeRecordFormat
        }
      }

      setCustomerObj(recordTemplateObject)
    }
    
    // Fetch records from Firestore if the user isn't attempting to add a new one; they're accessing an existing record
    if (searchParams.has("newRecord") === false) {
      getCustomersArray()
    }
    
    // Update customerObj with the 'new customer record' template to display an empty form for entry.
    else {
        getRecordTemplate()
      }

}, [])

    function handleChange(event, newValue) {
        // If in editmode, when I go to another tab, save edits to state
        if (editMode) {
          saveChanges(setCustomerObj)
        }

        // To display the chosen tab's contents 
        setValue(newValue);
      };  
      
      
    if (!currentUser) {
      return null
    }
      

    return (
        <DashboardLayout>
            <DashboardNavbar />
            { customerObj && <Grid container>
                <Grid item xs={12}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Customer"  sx={{ fontSize: '0.95rem'}}/>
                        <Tab label="Vehicle Specs"  sx={{ fontSize: '0.95rem'}}/>
                        <Tab label="MOT Test Overview"  sx={{ fontSize: '0.95rem'}}/>
                        <Tab label="Billing & Costs"  sx={{ fontSize: '0.95rem'}}/>
                    </Tabs>
                  
                  <div style={{position: "relative"}}> 
                    {value === 0 && <TabFormDisplay title="Customer Details" detailsArray={customerDetails} editMode={editMode} />}
                    {value === 1 && <TabFormDisplay title="Vehicle Specifications" detailsArray={vehicleDetails} editMode={editMode} />}
                    {value === 2 && <TabFormDisplay title="MOT Test Overview" detailsArray={motTestDetails} editMode={editMode} />}
                    {value === 3 && <TabFormDisplay title="Billing & Costs" detailsArray={costsAndBilling} editMode={editMode} />}
                    <EditButton 
                      saveChanges={saveChanges} 
                      setterFn={setCustomerObj} 
                      editMode={editMode} 
                      setEditMode={setEditMode} 
                      docId={docId}
                      setDocId={setDocId}
                      setError={setError}
                      setSuccess={setSuccess}
                    />
                    { editMode && <CancelButton /> }
                    { error && <p style={{color: "red"}}>{`Error updating server: ${error.message}`}</p>}
                    { success && <p style={{color: "green"}}>{"Changes saved to server!"}</p>}
                  </div>
                    
                </Grid>
            </Grid> 
          }
        </DashboardLayout>
    )
}