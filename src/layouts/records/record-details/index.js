import React, { useState, useEffect } from "react"
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import { Tabs, Tab, Box } from "@mui/material"
import Grid from '@mui/material/Grid';
import EditButton from "../../../components/EditButton/index.js"
import Icon from "@mui/material/Icon";
import { customers } from "./customers.js"
import { useParams } from "react-router-dom"
import "./selected-tab.css"

export default function RecordDetails() {
    const { id } = useParams()
    const [value, setValue] = useState(0)

    const { customerDetails,
            vehicleIdentification,
            vehicleDetails,
            motTestDetails,
            testResultsAndAdvisories,
            emissionDetails,
            previousTestResults,
            inspectorsNotes,
            additionalWorkDone,
            costsAndBilling,
           } = customers[id]


    useEffect( () => {
      const recordEditIcons = Array.from(document.getElementsByClassName("record-edit-icon"))
      console.log(recordEditIcons)

      recordEditIcons.forEach( icon => {
        icon.addEventListener("click", event => {

          const latestRecordEditIconsList = Array.from(document.getElementsByClassName("record-edit-icon"))
          
          const iconClicked = event.currentTarget

          const iconClickedIndex = latestRecordEditIconsList.indexOf(iconClicked)
          
          const span = document.getElementsByClassName("value")[iconClickedIndex] 
          const value = span.textContent
 
          const tickIcon = document.createElement("span")
          tickIcon.textContent = "tick icon"
          iconClicked.parentNode.replaceChild(tickIcon, iconClicked)

          const inputBox = document.createElement("input")
          inputBox.value = value;

          span.parentNode.replaceChild(inputBox, span)
        })
      })

    
    }, [value])

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      // store details in variable 
      // would this be overloading the function?
      // I could write the button once here or 10 times inside the Box tags?
      // write it out 10 times to keep things simple.

      // import the button
      // render it inside the box tags
      // add styling to position it in top right corner

      // const iconFunction = () => {
      //   const span = document.getElementsByClassName("value")[0] 
      //   const value = span.textContent

      //   console.log(value)

      //   const inputBox = document.createElement("input")
      //   inputBox.value = value;

      //   span.parentNode.replaceChild(inputBox, span)
      // }


      function renderTabDetails(details) {
        return details.map(detail => (
            <p key={detail.label}>
              <strong>{detail.label}:</strong> <span className="value">{detail.value}</span>
              <Icon 
                fontSize="small" 
                sx={{marginLeft: "10px", visibility: "hidden", cursor: "pointer"}}
                className="record-edit-icon"
              >
                edit_icon
              </Icon>
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

                    {value === 0 && <Box sx={boxStyles}><h2>Customer Details</h2>{renderTabDetails(customerDetails)}<EditButton sx={editButtonStyles} /></Box>}
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