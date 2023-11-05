import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { db, collection, getDocs, addDoc } from "../../config/firebase.js"
import { customers } from "./record-details/customers.js"
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DeleteRecord from "../../components/DeleteRecord/index.js"

import Grid from '@mui/material/Grid';
import DataTable from "examples/Tables/DataTable";
import Icon from "@mui/material/Icon";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Importing 'Current User' Context
import { useContext } from "react"
import { AuthContext } from "../../AuthContext/AuthContext.js"

// Hook to protect non-signed-in access
import { useNavigateToSignInPage } from "../authentication/hooks/useNavigateToSignInPage.js"


async function addCustomer() {
    // get array length
    // loop over as many times as array lenght, for each objbect, push to cloud

    const customersArray = customers[3]
    for (let i = 0; i < customersArray.length; i++) {
        
        await addDoc(collection(db, "customers"), customersArray[i])
    }
}

export default function RecordsPage() {

    // Handling redirection to sign in if user not logged in
    useNavigateToSignInPage()
    // 

    const { currentUser } = useContext(AuthContext)
    const [customersArray, setCustomersArray] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate()
    
    // ==== isProcessing is used to disable delete buttons whilst a deletion is occuring ==== // 

    // While the snackbar is visible, delete buttons are disabled to prevent race conditions.
    // The issue:
    // 1. Pressing delete triggers a snackbar and fetches updated database snapshot.
    // 2. Pressing another delete starts a new fetch and re-render to display updated db data.
    // 3. The first snackbar's close event might cause a premature component re-render,
    // interrupting the second delete's view update, leading to a potential view-database mismatch.
    // Temporarily disabling the delete buttons ensures consistent behavior.
    const [isProcessing, setIsProcessing] = useState(false)


    // Triggers re-fetching of customer data when a Record is deleted
    const [fetchAgain, setFetchAgain] = useState(null)

    let customersRowsArray
    let filteredCustomersRowsArray

    // Fetches customer data and stores it in state
    useEffect(() => {
        async function getCustomersArray() {
            const customersArray = await getDocs(collection(db, "customers"))
            setCustomersArray(customersArray.docs)
        }

        getCustomersArray()
        
    }, [fetchAgain])

    function handleClose(event, reason){
        if (reason === 'clickaway') {
        return;
        }
        setOpenSnackbar(false);
    };
   
    // Preparing customer rows data
    if (customersArray) {
        customersRowsArray = customersArray.map( (customer, index) => {
            const { customerDetails,
                    vehicleDetails,
                    motTestDetails,
                    inspectorsNotes, 
                    displayToUser,
                    costsAndBilling
                } = customer.data()

            return { 
                 id: index, 
                 documentId: customer.id,
                 displayToUser: displayToUser,
                 customer_name: customerDetails[0].value, 
                 vehicle_make: vehicleDetails[3].value, 
                 model: vehicleDetails[4].value,
                 derivative: vehicleDetails[3].value,
                 customer_phone_number: customerDetails[3].value,
                 booking_date: customerDetails[4].value,
                 booking_time: customerDetails[5].value,
                 mot_status: motTestDetails[0].value,
                 payment: costsAndBilling[3].value,
                 assigned_inspector: inspectorsNotes[1].value,
                 additional_work_notes: inspectorsNotes[0].value
                }
        })

        // Only return the records which have not been soft deleted.
        filteredCustomersRowsArray = customersRowsArray.filter( customer => {
            return customer.displayToUser
        })
    }

    if (!currentUser) {
        return null
    }
            
    return (    
        <DashboardLayout>
            <DashboardNavbar />
            { customersArray ? <Icon fontSize="large" title="Add Record" style={{cursor: "pointer", position: "absolute", right: "50%", top: "150px"}} onClick={() => navigate("/MOT-Records/new?newRecord=true&editMode=true")}>add_circle_icon</Icon> : "Loading..." }
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
                                { Header: "Vehicle Make", accessor: "vehicle_make", width: "8%" },
                                { Header: "Model", accessor: "model", width: "3%" },
                                { Header: "Booking Date", accessor: "booking_date", width: "6.5%" },
                                { Header: "Booking Time", accessor: "booking_time", width: "8%" },
                                { Header: "MOT Status", accessor: "mot_status", width: "7%" },
                                { Header: "Payment", accessor: "payment", width: "9.9%" },
                                { Header: "",
                                  accessor: "view_details", 
                                  disableFilters: true,
                                  disableSortBy: true,
                                  className: "no-filter-icon",
                                  width: "5%", 
                                  Cell: ( { row } ) => (
                                    <div style={{display: "flex"}}>
                                        <Icon title="View Record" fontSize="small" style={{cursor: "pointer", marginRight: "5px"}} onClick={() => navigate(`/MOT-Records/${row.original.id}`)}
                                        >
                                            visibility_icon 
                                        </Icon>
                                        <Icon title="Edit Record" fontSize="small" style={{cursor: "pointer"}} onClick={() => navigate(`/MOT-Records/${row.original.id}?editMode=true`)}
                                        >
                                            edit_icon
                                        </Icon>
                                        <DeleteRecord 
                                            row={row}
                                            setFetchAgain={setFetchAgain}
                                            setOpenSnackbar={setOpenSnackbar}
                                            isProcessing={isProcessing}
                                            setIsProcessing={setIsProcessing}
                                        />
                                    </div>
                                  )
                                }
                            ],
                            rows: filteredCustomersRowsArray ? filteredCustomersRowsArray : []
                        }            
                    }
                    />
                </Grid>
                <Grid item xs={1}></Grid>
                <Snackbar 
                    open={openSnackbar} 
                    autoHideDuration={1500}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // position of the toast
                >
                <Alert onClose={handleClose} severity="success" variant="filled">
                    Record successfully deleted!
                </Alert>
                </Snackbar>
            </Grid>
        }
        { customersArray && 
          <>
            <button onClick={() => addCustomer()}>add dummy customer</button>
            <button onClick={() => addDoc(collection(db, "record-template"), customers[1])}>Add Record template to firestore</button>
          </>
        }
    </DashboardLayout>        
    )
}