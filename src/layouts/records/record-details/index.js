import React, { useState } from "react"
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import { Tabs, Tab, Box } from "@mui/material"
import Grid from '@mui/material/Grid';
import { vehicleIdentificationData, 
        vehicleIdentificationDetails,
        vehicleSpecsData,
        vehicleSpecsDetails } from "./data.js"

export default function RecordDetails() {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      function renderTabDetails(details) {
        return details.map(detail => (
          <p key={detail.label}>
            <strong>{detail.label}:</strong> {detail.value}
          </p>
        ));
      }

      const boxStyles = {
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
        "&:last-child": { // target the last <p> element
          marginBottom: "0px" // remove the bottom margin for the last element
        }
      };
      
      
      

     
    

    return (
        <DashboardLayout>
            <Grid container>
                <Grid item xs={12}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Customer Details"  sx={{ fontSize: '0.9rem'}}/>
                        <Tab label="Vehicle Identification" sx={{ fontSize: '0.9rem'}} />
                        <Tab label="Vehicle Specs"  sx={{ fontSize: '0.9rem'}}/>
                        <Tab label="MOT Test Overview"  sx={{ fontSize: '0.9rem'}}/>
                        <Tab label="Test Results & Advisories"  sx={{ fontSize: '0.9rem'}}/>
                        <Tab label="Emissions"  sx={{ fontSize: '0.9rem'}}/>
                        <Tab label="Historical Records" sx={{ fontSize: '0.9rem'}} />
                        <Tab label="Maintenance & Repairs"  sx={{ fontSize: '0.9rem'}}/>
                        <Tab label="Billing & Costs"  sx={{ fontSize: '0.9rem'}}/>
                        <Tab label="Future Recommendations"  sx={{ fontSize: '0.9rem'}}/>
                    </Tabs>

                    {value === 0 && <Box>Customer details...</Box>}
                    {value === 1 && <Box sx={boxStyles}>{renderTabDetails(vehicleIdentificationDetails)}</Box>}
                    {value === 2 && <Box>{renderTabDetails(vehicleSpecsDetails)}</Box>}
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}