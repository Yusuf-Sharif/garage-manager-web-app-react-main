import React, { useState, useEffect } from "react"
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import MDInput from "../../../components/MDInput/index.js"
import { Tabs, Tab, Box } from "@mui/material"
import Grid from '@mui/material/Grid';
import EditButton from "../../../components/EditButton/index.js"
import Icon from "@mui/material/Icon";
import { customers } from "./customers.js"
import { useParams, useSearchParams } from "react-router-dom"
import "./selected-tab.css"

export default function RecordDetails() {
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [value, setValue] = useState(0)
    const [editMode, setEditMode] = useState(searchParams.has("editMode"))
    const [customerObj, setCustomerObj] = useState(customers[id])

    console.log(searchParams.has("editMode"))

    const { customerDetails,
            vehicleIdentification,
            vehicleDetails,
            motTestDetails,
            testResultsAndAdvisories,
            previousTestResults,
            additionalWorkDone,
            costsAndBilling,
           } = customerObj

        const saveChanges = (arrayName) => {
          // Overview - Save user's edits across re-renders:
            // Grab labels and input box values, 
            // Store them in an array, 
            // Update customerObj state with array, overwriting previous array



        // grab the paragraphs of the form currently displayed
        const labelsAndValues = Array.from(document.getElementsByClassName("p-label-and-value"))


        // inputbox.value is there the value is stored

          // For each label/value pair (each paragraph) store it inside an object 

        // with an array of paragraphs, 
                // map over each paragraph, 
                // returning an object in lablel : value format
        const newArray = labelsAndValues.map( paragraph => {
            const label = paragraph.children[0]
            // Grabbing the MDInput box's actual input element 
            const mdInputDiv = paragraph.children[1]
            const mdInputDivNestedDiv = mdInputDiv.children[0]
            const mdInputInputElement = mdInputDivNestedDiv.children[0]


            return {
                label: label.textContent,
                value: mdInputInputElement.value
            }
        })     
        
        // insert that array into a new object using name and array from previous 2 steps
        // update state with new object 
    

        const newCustomerObject = {
            // bring in arrays from customer Object
            customerDetails,
            vehicleIdentification,
            vehicleDetails,
            motTestDetails,
            testResultsAndAdvisories,
            previousTestResults,
            additionalWorkDone,
            costsAndBilling,
            [arrayName]: newArray
        }

        console.log("newCustomerObject:")
        console.log(newCustomerObject)

        // update customerObj in state
        setCustomerObj(newCustomerObject)
        // then try using previousState to fill in rest of object
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      function renderTabDetails(details) {
        return details.map(detail => (
            <p key={detail.label} className="p-label-and-value">
              <span><strong>{detail.label}</strong></span>:{ editMode ? <MDInput sx={{marginLeft: "7px", bottom: "9px" }} defaultValue={detail.value} /> : <span className="value" style={{marginLeft: "7px"}}>{detail.value}</span> }
            </p>
        ));
      }
      
      const boxStyles = {
        position: "relative",
        fontSize: "15px",
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #e0e0e0", // subtle border
        borderRadius: "8px", // rounded corners
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // subtle shadow
        backgroundColor: "#fafafa", // light background
        "& > p": { // target <p> elements directly inside the box
          marginBottom: "10px", // spacing between paragraphs
          fontSize: "1.1em", // slightly bigger font for better readability
          lineHeight: "1.5", // more space between lines for better readability
          "& > strong": { // target <strong> elements inside the paragraphs
            fontWeight: "600", // semi-bold font-weight
            marginRight: "10px" // spacing between the label and value
          }
        },
        "& > p:last-child": { // target the last <p> element
          marginBottom: "0px" // remove the bottom margin for the last element
        },
        "& > h2": {
          marginBottom: "5px",
          textDecoration: "underline"
        }
      };

      const editButtonStyles = {
        position: "absolute", 
        top: "10px",
        right: "10px",        
      }
      

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

                    {value === 0 && <Box sx={boxStyles}><h2>Customer Details</h2>{renderTabDetails(customerDetails)}<EditButton sx={editButtonStyles} arrayName="customerDetails" saveChanges={saveChanges} editMode={editMode} setEditMode={setEditMode} /></Box>}
                    {value === 1 && <Box sx={boxStyles}><h2>Vehicle ID</h2>{renderTabDetails(vehicleIdentification)}<EditButton sx={editButtonStyles} /></Box>}
                    {value === 2 && <Box sx={boxStyles}><h2>Vehicle Specs</h2>{renderTabDetails(vehicleDetails)}</Box>}
                    {value === 3 && <Box sx={boxStyles}><h2>MOT Test Overview</h2>{renderTabDetails(motTestDetails)}</Box>}
                    {value === 4 && <Box sx={boxStyles}><h2>Test Results & Advisories</h2>{renderTabDetails(testResultsAndAdvisories)}</Box>}
                    {value === 5 && <Box sx={boxStyles}><h2>Historical Records</h2>{renderTabDetails(previousTestResults)}</Box>}
                    {value === 6 && <Box sx={boxStyles}><h2>Maintenance & Repairs</h2>{renderTabDetails(additionalWorkDone)}</Box>}
                    {value === 7 && <Box sx={boxStyles}><h2>Billing & Costs</h2>{renderTabDetails(costsAndBilling)}</Box>}
                    
                    
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}