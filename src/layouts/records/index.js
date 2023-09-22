import { useState, useEffect } from "react"
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from '@mui/material/Grid';
import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom"
import { customer1 } from "./record-details/customer1.js"
import { db, collection, getDocs, query, limit, addDoc } from "../../config/firebase.js"
import { customers } from "./record-details/customers.js"

async function addCustomer() {
    addDoc(collection(db, "customers"), customers[0])
}

export default function RecordsPage() {
    // Component Overview:
        // This component fetches and renders the Records from firebase
        // This component also passes a customer object to the Record Details page
        // when the 'VIEW' or 'EDIT' button is clicked on a record row



    const [customersArray, setCustomersArray] = useState(null)
    let customersRowsArray

     // Map over each customer and return a row object 
     // update 'rows:' property's value to customersRowsArray variable
    if (customersArray) {
        console.log("customersArray")
        console.log(customersArray[0].data())

        customersRowsArray = customersArray.map( (customer, index) => {
            const { customerDetails,
                    vehicleDetails,
                    appointmentDetails,
                    motStatus,
                    inspectorsNotes
                } = customer.data()

           return { 
            id: index, 
            customer_name: customerDetails[0].value, 
            vehicle_make: vehicleDetails[3].value, 
            model: vehicleDetails[4].value,
            derivative: vehicleDetails[3].value,
            customer_phone_number: customerDetails[3].value,
            booking_date: appointmentDetails[0].value,
            booking_time: appointmentDetails[1].value,
            mot_status: motStatus,
            assigned_inspector: inspectorsNotes[1].value,
            additional_work_notes: inspectorsNotes[0].value
           }
        })
    }

    // Fetch the array of customers details from firestore
    // store the array of customer details in state
    useEffect(() => {
        async function getCustomersArray() {
            const customersArray = await getDocs(collection(db, "customers"))
            setCustomersArray(customersArray.docs)
        }

        getCustomersArray()

    }, [])

    const navigate = useNavigate()
            
    return (    
        <DashboardLayout>
            <DashboardNavbar />
            <button onClick={() => addCustomer()}>add customer</button>
            { customersArray && <Grid 
                container 
            >
                <Grid item xs={12}>
                    <DataTable 
                        canSearch
                        noEndBorder
                        table={{
                            columns: [
                                { Header: "Customer Name", accessor: "customer_name", width: "5%" },
                                { Header: "Vehicle Make", accessor: "vehicle_make", width: "11%" },
                                { Header: "Model", accessor: "model", width: "3%" },
                                { Header: "Booking Date", accessor: "booking_date", width: "6.5%" },
                                { Header: "Booking Time", accessor: "booking_time", width: "10.5%" },
                                { Header: "MOT Status", accessor: "mot_status", width: "9.9%" },
                                // { Header: "Assigned Inspector", accessor: "assigned_inspector", width: "9.9%" },
                                // { Header: "Additional Work Notes", accessor: "additional_work_notes", width: "9.9%" },
                                { Header: "",
                                  accessor: "view_details", 
                                  disableFilters: true,
                                  disableSortBy: true,
                                  className: "no-filter-icon",
                                  width: "5%", 
                                  Cell: ( { row } ) => (
                                    <>
                                        <button 
                                            style={{padding: "3px", fontSize: "11px", marginRight: "10px"}} 
                                            onClick={() => {
                                                    navigate(`/MOT-Records/${row.original.id}?editMode=true`, { state: { customerObj: customersArray[row.original.id].data() } })
                                                }
                                            }
                                        >
                                            EDIT
                                        </button>
                                        <button 
                                            style={{padding: "3px", fontSize: "11px"}} 
                                            onClick={() => {
                                                // Passing the details of the selected customer to RecordDetails page
                                                // ( selected customer only, rather than passing the entire customersArray array via navigate state, as that was causing problems 
                                                // as that data was too large it seems. )
                                                navigate(`/MOT-Records/${row.original.id}`, { state: { customerObj: customersArray[row.original.id].data() } })}}
                                        >
                                            VIEW
                                        </button>
                                    </>
                                  )
                                }
                            ],
                            rows: customersRowsArray ? customersRowsArray : []
                        }            
                    }
                    />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        }
    </DashboardLayout>        
    )
}