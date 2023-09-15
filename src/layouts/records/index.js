import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from '@mui/material/Grid';
import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom"
import { customer1 } from "./record-details/customer1.js"


// Challenge: datashare with one customer 
    // import the customer's data
    // destructure the object, pulling out variables relevant to Grid view
    // insert these variables into grid rows

export default function RecordsPage() {
    const navigate = useNavigate()

    const { customerDetails,
            vehicleDetails,
            appointmentDetails,
            motStatus,
            inspectorsNotes } = customer1  


    // create a fn
        // takes an id
        // grabs the object/array at that index of customers array,
        //

    return (    
        <DashboardLayout>
            <DashboardNavbar />
            <Grid 
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
                                        <button style={{padding: "3px", fontSize: "11px", marginRight: "10px"}} onClick={() => navigate(`/MOT-Records/${row.original.id}?editMode=true`)}>EDIT</button>
                                        <button style={{padding: "3px", fontSize: "11px"}} onClick={() => navigate(`/MOT-Records/${row.original.id}`)}>VIEW</button>
                                    </>
                                  )
                                }
                            ],
                            rows: [
                                {   
                                    id: 0, 
                                    customer_name: customerDetails[0].value, 
                                    vehicle_make: vehicleDetails[1].value, 
                                    model: vehicleDetails[2].value,
                                    derivative: vehicleDetails[3].value,
                                    customer_phone_number: customerDetails[3].value,
                                    booking_date: appointmentDetails[0].value,
                                    booking_time: appointmentDetails[1].value,
                                    mot_status: motStatus,
                                    assigned_inspector: inspectorsNotes[1].value,
                                    additional_work_notes: inspectorsNotes[0].value
                                },
                                {   
                                    id: 1, 
                                    customer_name: "John Doe", 
                                    vehicle_make: "Honda", 
                                    model: "Civic",
                                    derivative: "Civic LX",
                                    customer_phone_number: "020 8837 5684",
                                    booking_date: "12/09/2023",
                                    booking_time: "16:00",
                                    mot_status: "Failed",
                                    assigned_inspector: "Alice Johnson",
                                    additional_work_notes: "Vehicle shows signs of wear and tear"
                                },
                                {   
                                    id: 2, 
                                    customer_name: "Jane Adams", 
                                    vehicle_make: "Ford", 
                                    model: "Focus",
                                    derivative: "Focus ST",
                                    customer_phone_number: "020 4545 8989",
                                    booking_date: "15/09/2023",
                                    booking_time: "10:30",
                                    mot_status: "Passed",
                                    assigned_inspector: "Mark Thompson",
                                    additional_work_notes: "Vehicle is in great condition"
                                },
                                {   
                                    id: 3, 
                                    customer_name: "Bill Smith", 
                                    vehicle_make: "Toyota", 
                                    model: "Corolla",
                                    derivative: "Corolla XSE",
                                    customer_phone_number: "020 7689 1234",
                                    booking_date: "18/09/2023",
                                    booking_time: "14:15",
                                    mot_status: "Failed",
                                    assigned_inspector: "Lucy Walters",
                                    additional_work_notes: "Minor scratches on side door"
                                },
                                {   
                                    id: 4, 
                                    customer_name: "Emily Johnson", 
                                    vehicle_make: "Honda", 
                                    model: "Civic",
                                    derivative: "Civic LX",
                                    customer_phone_number: "020 8876 5678",
                                    booking_date: "20/09/2023",
                                    booking_time: "13:00",
                                    mot_status: "Passed",
                                    assigned_inspector: "John Miller",
                                    additional_work_notes: "Interior well-maintained"
                                },
                                {   
                                    id: 5, 
                                    customer_name: "Michael Brown", 
                                    vehicle_make: "Mazda", 
                                    model: "CX-5",
                                    derivative: "CX-5 Sport",
                                    customer_phone_number: "020 3344 5566",
                                    booking_date: "23/09/2023",
                                    booking_time: "15:30",
                                    mot_status: "Failed",
                                    assigned_inspector: "John Miller",
                                    additional_work_notes: "Interior well-maintained"
                                }
                            ]
                        }            
                    }
                    />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
    </DashboardLayout>        
    )
}