import React from "react"
import { Box } from "@mui/material"
import Grid from '@mui/material/Grid';
import { renderTabDetails } from "../../utils.js"

export default function TabFormDisplay( { title, detailsArray, editMode } ) {

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

    // Manually implementing columns. 
    // Suggestion from chat gpt. 
    // chat: https://chat.openai.com/c/f2ae662c-fb92-45b6-92ae-5a8f34fa4c63

    const maxHeight = title === "Customer Details" ? 200 : 400; // Define your max height
    const averageItemHeight = 50; // An estimated average height for each item (including margin, padding, etc.)

    const splitIndex = Math.floor(maxHeight / averageItemHeight);

    const leftColumnDetails = detailsArray.slice(0, splitIndex);
    const rightColumnDetails = detailsArray.slice(splitIndex);

    return (
        <Box sx={boxStyles}>
            <h2 style={{marginBottom: "20px"}}>{title}</h2>
            <Grid container>
              <Grid item xs={6}>
                {renderTabDetails(leftColumnDetails, editMode, title)}
              </Grid>

              <Grid item xs={6}>
                {renderTabDetails(rightColumnDetails, editMode, title)}
              </Grid>
            </Grid>
        </Box>
    )
}


{/* <Box sx={boxStyles}>
<h2>{title}</h2>
<div style={{ columnWidth: "100vw", maxHeight: "500px", overflow: "auto"}}>
  {renderTabDetails(detailsArray, editMode, title)}
</div>
</Box> */}