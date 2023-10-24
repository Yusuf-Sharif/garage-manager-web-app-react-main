import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

// Importing firebase dependencies
import { collection, getDocs, db } from "../../config/firebase.js"

// Importing 'Current User' Context
import { AuthContext } from "../../AuthContext/AuthContext.js"

// Hook to protect non-signed-in access
import { useNavigateToSignInPage } from "../authentication/hooks/useNavigateToSignInPage.js"

import 'react-big-calendar/lib/css/react-big-calendar.css';
import "./calendar-css-edits.css"

const localizer = momentLocalizer(moment);  // or globalizeLocalizer


export default function Appointments() {
    const { currentUser } = useContext(AuthContext)
    const [allNonDeletedRecords, setAllNonDeletedRecords] = useState(null)
    
    // Calendar events
    const events = allNonDeletedRecords?.map( record => {

      // Convert date string to javasript date object        
      const dateStr = record.customerDetails[4].value
      const timeStr = record.customerDetails[5].value
      const { dateTimeObj, oneHourLater } = stringToDateTime(dateStr, timeStr);
      
      // Return a calendar event object 
      return {
          start: dateTimeObj, 
          end: oneHourLater ? oneHourLater : dateTimeObj, 
          title: `Service with ${record.customerDetails[0].value}`
      }
  })

    const navigate = useNavigate()

    // Registering useEffect
    useNavigateToSignInPage()
    // 

    // Custom date cell wrapper to display tooltip on hover
    function CustomDateCellWrapper({ children }) {
      return React.cloneElement(React.Children.only(children), {
        title: "Create Booking",
      });
    };   
  
    // Convert date string to javasript date object
    function stringToDateTime(dateString, timeString) {
        const [day, month, year] = dateString.split('/').map(Number);

        if (timeString != "") 
        {
            const [hoursStr, minutesStr, period] = timeString.match(/(\d+):(\d+) (\w+)/).slice(1);
        
            let hours = Number(hoursStr);
            const minutes = Number(minutesStr);
        
            // Convert the 12-hour time format to 24-hour
            if (period.toUpperCase() === "PM" && hours !== 12) {
                hours += 12;
            } else if (period.toUpperCase() === "AM" && hours === 12) {
                hours = 0;
            }

            const dateTimeObj = new Date(year, month - 1, day, hours, minutes)
            const oneHourLater = new Date(dateTimeObj.getTime() + 60*60*1000);
        
            // Note: The month parameter of the Date constructor is 0-based.
            return {
                dateTimeObj,
                oneHourLater
            }

        }

        else {
            // If time is empty, then don't try to manipulate the time
            // Note: The month parameter of the Date constructor is 0-based.
            const dateTimeObj = new Date(year, month - 1, day);

            return {
                dateTimeObj,
                oneHourLater: undefined
            }
        }
    }

    // const events = allNonDeletedRecords?.map( record => {

    //     // convert date string to javasript date object        
    //     const dateStr = record.customerDetails[4].value
    //     const timeStr = record.customerDetails[5].value
    //     const { dateTimeObj, oneHourLater } = stringToDateTime(dateStr, timeStr);

        

    //     console.log("dateTimeObj")
    //     console.log(dateTimeObj)
        
    //     // Return a calendar event object 
    //     return {
    //         start: dateTimeObj, 
    //         end: oneHourLater ? oneHourLater : dateTimeObj, 
    //         title: `Service with ${record.customerDetails[0].value}`
    //     }
    // })

    function handleSlotSelect(slotInfo) {
      // Format date to record format "DD/MM/YYYY"
      function formatDate(date) {
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
          const year = date.getFullYear();
      
          return `${day}/${month}/${year}`;
      }
      
      // Format start time to record format "00:00 AM"
      function formatTime(date) {
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        // Convert hours from 24-hour format to 12-hour format
        hours = hours % 12;
        // Convert 0 (midnight) to 12
        hours = hours ? hours : 12;
    
        return `${hours}:${minutes} ${ampm}`;
      }
  
      const dateRecordFormat = formatDate(slotInfo.start);
      const timeRecordFormat = formatTime(slotInfo.start);

      // Pass date and start time to record creation page via naviagate state to be used to prefill fields
      navigate("/MOT-Records/new?newRecord=true&editMode=true", { state: { dateRecordFormat, timeRecordFormat }  })
      
    }

  // Fetch non-deleted records from Firestore
  // Todo: Lift this logic up to a function to be reused across the web app (DRY)
  useEffect(() => {
    async function getAllNonDeletedRecords() {

      // Download all records 
      const querySnapshot = await getDocs(collection(db, "customers"))
    
      // Filter to keep only displayToUser true records
      const getNonDeletedRecords = () => {
    
        // Filter out docs which are soft deleted
        const filteredRecords = querySnapshot.docs.filter( doc => {
        const docData = doc.data()
        return docData.displayToUser   
      })
    
      // Extract the actual customer objects from the (filtered) docs
      const recordDataArray = filteredRecords.map(doc => {
        return doc.data()
      })

      return recordDataArray
    
    }

      // Store non-deleted records in local state
      setAllNonDeletedRecords(getNonDeletedRecords())

    }

    getAllNonDeletedRecords()

  }, [])

  if (!currentUser) {
    return null
  }

  return (
    <DashboardLayout>
        <DashboardNavbar />
        <div style={{ height: 600 }}>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable="single"
            onSelectSlot={handleSlotSelect}
            components={{
              dateCellWrapper: CustomDateCellWrapper,
            }}
        />
        </div>
    </DashboardLayout>
  );
}
