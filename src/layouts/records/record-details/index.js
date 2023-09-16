import React, { useState, useEffect } from "react"
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import MDInput from "../../../components/MDInput/index.js"
import { Tabs, Tab, Box } from "@mui/material"
import Grid from '@mui/material/Grid';
import EditButton from "../../../components/EditButton/index.js"
import TabFormDisplay from "../../../components/TabFormDisplay/index.js"
import Icon from "@mui/material/Icon";
import { customers } from "./customers.js"
import { useParams, useSearchParams } from "react-router-dom"
import { saveChanges } from "../../../utils.js"
import "./selected-tab.css"

export default function RecordDetails() {
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [value, setValue] = useState(0)
    const [editMode, setEditMode] = useState(searchParams.has("editMode"))
    const [customerObj, setCustomerObj] = useState(customers[id])

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
            <Grid container>
                <Grid item xs={12}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Customer"  sx={{ fontSize: '0.8rem'}}/>
                        <Tab label="Vehicle ID" sx={{ fontSize: '0.8rem'}} />
                        <Tab label="Vehicle Specs"  sx={{ fontSize: '0.8rem'}}/>
                        <Tab label="MOT Test Overview"  sx={{ fontSize: '0.8rem'}}/>
                        <Tab label="Test Results & Advisories"  sx={{ fontSize: '0.8rem'}}/>
                        <Tab label="Historical Records" sx={{ fontSize: '0.8rem'}} />
                        <Tab label="Maintenance & Repairs"  sx={{ fontSize: '0.8rem'}}/>
                        <Tab label="Billing & Costs"  sx={{ fontSize: '0.8rem'}}/>
                    </Tabs>
                  
                  <div style={{position: "relative"}}> 
                    {value === 0 && <TabFormDisplay title="Customer Details" detailsArray={customerDetails} editMode={editMode} />}
                    {value === 1 && <TabFormDisplay title="Vehicle ID" detailsArray={vehicleIdentification} editMode={editMode} />}
                    {value === 2 && <TabFormDisplay title="Vehicle Specs" detailsArray={vehicleDetails} editMode={editMode} />}
                    {value === 3 && <TabFormDisplay title="MOT Test Overview" detailsArray={motTestDetails} editMode={editMode} />}
                    {value === 4 && <TabFormDisplay title="Test Results & Advisories" detailsArray={testResultsAndAdvisories} editMode={editMode} />}
                    {value === 5 && <TabFormDisplay title="Historical Records" detailsArray={previousTestResults} editMode={editMode} />}
                    {value === 6 && <TabFormDisplay title="Maintenance & Repairs" detailsArray={additionalWorkDone} editMode={editMode} />}
                    {value === 7 && <TabFormDisplay title="Billing & Costs" detailsArray={costsAndBilling} editMode={editMode} />}
                    <EditButton saveChanges={saveChanges} setterFn={setCustomerObj} editMode={editMode} setEditMode={setEditMode} />
                  </div>
                    
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}