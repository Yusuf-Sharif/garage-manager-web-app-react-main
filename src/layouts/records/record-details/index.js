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
    const [customerObj, setCustomerObj] = useState(customers[id])

    // create a counter, if counter = 5
    // then return a different JSX to the screen 
    // incremenet counter when updating customerObj in saveChanges fn

    const [count, setCount] = useState(0)

    console.log(count)

    console.log("Record Details page rendered")

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
        // grab the paragraphs of the form currently displayed
        const labelsAndValues = Array.from(document.getElementsByClassName("p-label-and-value"))


        // inputbox.value is there the value is stored

          // For each label/value pair (each paragraph) store it inside an object 

        // with an array of paragraphs, 
                // map over each paragraph, 
                // returning an object in lablel : value format
        const newArray = labelsAndValues.map( paragraph => {
            const label = paragraph.children[0]
            const inputBox = paragraph.children[1]

            return {
                label: label.textContent,
                value: inputBox.value
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

        // increment count
        setCount(prevState => prevState + 1)
    }

    const handleFormUpdate = () => {
      const inputBox = document.getElementsByClassName("edit-input-box")[0]
      const labelText = inputBox.parentNode.querySelector("span")
      console.log(labelText.textContent)
    }


    useEffect( () => {
      const recordEditIcons = Array.from(document.getElementsByClassName("record-edit-icon"))

      // Handling visual changes when edit pencil icon is clicked 
      recordEditIcons.forEach( icon => {
        icon.addEventListener("click", event => {
          // Before proceeding with visual changes, make sure there are no input fields currently "open".
          // This is so I can easily target the label whoose value is being modified.
          const noOfInputBoxes = document.getElementsByClassName("edit-input-box").length
          console.log(noOfInputBoxes)

          if (noOfInputBoxes === 0) {
            // Targetting the correct span tag in order to replace it with input box.
            const latestRecordEditIconsList = Array.from(document.getElementsByClassName("record-edit-icon"))
            const iconClicked = event.currentTarget
            const iconClickedIndex = latestRecordEditIconsList.indexOf(iconClicked)
            const span = document.getElementsByClassName("value")[iconClickedIndex] 
            
            // Saving current value of span
            const value = span.textContent
  
            // Creating input box
            const inputBox = document.createElement("input")
            inputBox.setAttribute("class", "edit-input-box")
            inputBox.value = value;
  
            // Replacing span tag with input box
            span.parentNode.replaceChild(inputBox, span)
  
            // Creating 'check' button
            const tickIcon = document.createElement("span")
            tickIcon.setAttribute("class", "material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeSmall css-19llp29-MuiIcon-root")
            tickIcon.textContent = "check_icon"
            tickIcon.style.position = "relative"
            tickIcon.style.top = "3px"
            tickIcon.style.left = "3px"
            tickIcon.style.cursor = "pointer"
            tickIcon.addEventListener("click", handleFormUpdate)
  
            // Replacing 'edit icon' button with 'check' button
            iconClicked.parentNode.replaceChild(tickIcon, iconClicked)          

          }

          // If there is an input field currently "open", warn the user via a console log
          else {
            console.log("Error: You must first save your changes before editing another value.")
          }

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
      console.log("render tab details is running!")

        const returnedJsx = details.map(detail => (
            <p key={detail.label} className="p-label-and-value">
              <span><strong>{detail.label}</strong></span>:<span className="value">{detail.value}</span>
            </p>
        ));

        console.log(returnedJsx)

        if (count < 6) {
          return returnedJsx
        }

        else {
          console.log("bout to return a h1")
          return (
            <>
              <h1>Testing. Am I overwriting the form content with this h1?</h1>
            </>
          )
        }
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

                    {value === 0 && <Box sx={boxStyles}><h2>Customer Details</h2>{renderTabDetails(customerDetails)}<EditButton sx={editButtonStyles} arrayName="customerDetails" saveChanges={saveChanges} /></Box>}
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