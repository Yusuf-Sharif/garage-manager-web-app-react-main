import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from '@mui/material/Grid';
import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom"

export default function RecordsPage() {
    const navigate = useNavigate()

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid 
                container 
            >
                <Grid item xs={11}>
                    <DataTable 
                        canSearch
                        noEndBorder
                        table={{
                            columns: [
                                { Header: "id", accessor: "id", width: "10%" },
                                { Header: "Name", accessor: "name", width: "25%" },
                                { Header: "Date Booked", accessor: "date_booked", width: "25%" },
                                { Header: "Vehicle Make", accessor: "vehicle_make", width: "10%" },
                                { Header: "Model", accessor: "model", width: "8%" },
                                { Header: "Derivative", accessor: "derivative", width: "8%" },
                                { Header: "Customer Name", accessor: "customer_name", width: "15%" },
                                { Header: "Customer Phone", accessor: "customer_phone_number", width: "10%" },
                                { Header: "Booking Date", accessor: "booking_date", width: "10%" },
                                { Header: "Booking Time", accessor: "booking_time", width: "10%" },
                                { Header: "MOT Status", accessor: "mot_status", width: "8%" },
                                { Header: "Assigned Inspector", accessor: "assigned_inspector", width: "15%" },
                                { Header: "Additional Work Notes", accessor: "additional_work_notes", width: "15%" },
                                { Header: "",
                                  accessor: "view_details", 
                                  width: "25%", 
                                  Cell: ( { row } ) => (
                                    <button onClick={() => navigate(`/MOT-Records/${row.original.id}`)}>View</button>
                                  )
                                }
                            ],
                            rows: [
                                { id: 1, name: "Zahid", date_booked: "10/09/2023" },
                                { id: 2, name: "Yusuf", date_booked: "15/09/2023" },
                                { id: 3, name: "Uncle Irf", date_booked: "16/09/2023" },
                                { id: 4, name: "Eesa", date_booked: "16/09/2023" },
                                { id: 5, name: "Zaki", date_booked: "17/09/2023" },
                                { id: 6, name: "Muhammad", date_booked: "25/09/2023" },
                                { id: 7, name: "Bob", date_booked: "18/09/2023" },
                                { id: 8, name: "John", date_booked: "29/09/2023" },
                                { id: 9, name: "Mark", date_booked: "25/09/2023" },
                                { id: 10, name: "Sophie", date_booked: "29/09/2023" },
                                { id: 11, name: "Jack", date_booked: "10/09/2023" },
                                { id: 12, name: "James", date_booked: "16/09/2023" },
                                { id: 13, name: "Daniel", date_booked: "10/09/2023" },
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