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
import "./selected-tab.css"

export default function RecordDetails() {
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const [value, setValue] = useState(0)
    const [editMode, setEditMode] = useState(searchParams.has("editMode"))

    // If customersArray has been passed from Record page, through navigate state, then set it as default value
    const [customerObj, setCustomerObj] = useState(location.state?.customerObj || null)

    const { customerDetails,
            vehicleIdentification,
            vehicleDetails,
            motTestDetails,
            testResultsAndAdvisories,
            previousTestResults,
            additionalWorkDone,
            costsAndBilling,
           } = customerObj

    const handleChange = (event, newValue) => {
        // If in editmode, when I go to another tab, save edits to state (but dont update the servers object as user hasnt clicked save yet)
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
                    <EditButton saveChanges={saveChanges} setterFn={setCustomerObj} editMode={editMode} setEditMode={setEditMode} />
                    { editMode && <CancelButton /> }
                  </div>
                    
                </Grid>
            </Grid> 
          }
        </DashboardLayout>
    )
}