import React, { useState, useEffect } from "react"
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import MDInput from "../../../components/MDInput/index.js"
import { Tabs, Tab, Box } from "@mui/material"
import Grid from '@mui/material/Grid';
import EditButton from "../../../components/EditButton/index.js"
import CancelButton from "../../../components/CancelButton/index.js"
import TabFormDisplay from "../../../components/TabFormDisplay/index.js"
import Icon from "@mui/material/Icon";
import { customers } from "./customers.js"
import { useParams, useSearchParams, useLocation } from "react-router-dom"
import { saveChanges } from "../../../utils.js"
import { db, collection, getDocs } from "../../../config/firebase.js"
import "./selected-tab.css"

export default function RecordDetails() {
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const [value, setValue] = useState(0)
    const [editMode, setEditMode] = useState(searchParams.has("editMode"))

    // Steps:
      // Fetches the data

      // Updates its own state
      
      // Updates firestore 
      
      // Updates its own state 


    const [customerObj, setCustomerObj] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    console.log("error state:")
    console.log(error)
    const [docId, setDocId] = useState(null)

    // console.log("Customer DOC ID:")
    // console.log(docId)
    
    // Fetch the array of customers details from firestore
    // store the array of customer details in customerObj state
    useEffect(() => {
      async function getCustomersArray() {
          const customersArray = await getDocs(collection(db, "customers"))

        // update customer object state with selected customer's obj
        setCustomerObj(customersArray.docs[id].data())

        // set selected customer's firestore document id in state
        setDocId(customersArray.docs[id].id)
      }

      // function to fetch customerObj template from firestore (just labels with empty values)
      async function getRecordTemplate() {
        const recordTemplateFirestoreObject = await getDocs(collection(db, "record-template"))
        const recordTemplateObject = recordTemplateFirestoreObject.docs[0].data()
        setCustomerObj(recordTemplateObject)
      }
      

      // If user isnt trying to add a new record, then fetch the records from firestore.
      if (searchParams.has("newRecord") === false) {
        getCustomersArray()
      }
      else {
          // User is trying to add a new record, 
          // so update customerObj with just labels and empty values
          getRecordTemplate()
        }

  }, [])

    // If customersArray has been passed from Record page, through navigate state, then set it as default value

    const { customerDetails,
            vehicleIdentification,
            vehicleDetails,
            motTestDetails,
            testResultsAndAdvisories,
            previousTestResults,
            additionalWorkDone,
            costsAndBilling,
           } = customerObj || {} // In case firestore hasnt returned the customer object yet, fall back to empty object to prevent onscreen error

    const handleChange = (event, newValue) => {
        // If in editmode, when I go to another tab, save edits to state (but dont update the server's object as user hasnt clicked save yet)
        if (editMode) {
          saveChanges(setCustomerObj)
        }

        // To display the chosen tab's contents 
        setValue(newValue);
      };     
      

    return (
        <DashboardLayout>
            <DashboardNavbar />
            { customerObj && <Grid container>
                <Grid item xs={12}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Customer"  sx={{ fontSize: '0.8rem'}}/>
                        <Tab label="Vehicle Specs"  sx={{ fontSize: '0.8rem'}}/>
                        <Tab label="MOT Test Overview"  sx={{ fontSize: '0.8rem'}}/>
                        <Tab label="Billing & Costs"  sx={{ fontSize: '0.8rem'}}/>
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