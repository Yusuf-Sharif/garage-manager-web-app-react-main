import { useState, useEffect } from "react"
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from '@mui/material/Grid';
import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom"
import { customer1 } from "./record-details/customer1.js"
import { db, collection, getDocs, query, limit, addDoc, updateDoc, doc } from "../../config/firebase.js"
import { customers } from "./record-details/customers.js"
import DeleteRecord from "../../components/DeleteRecord/index.js"
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

    // registering useEffect
    useNavigateToSignInPage()
    // 

    const { currentUser } = useContext(AuthContext)


    console.log("Records Page rendering....")

    // Component Overview:
        // This component fetches and renders the Records from firebase
        // This component also passes a customer object to the Record Details page
        // when the 'VIEW' or 'EDIT' button is clicked on a record row



    const [customersArray, setCustomersArray] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Used to temporarily freeze the delete button when the snackbar is still visible
    // to avoid interupting the re fetching of data 
    // because what happens when delete is pressed is
    // data is refetched and filtered to display
    // if delete is pressed again, another data fetch is occuring 
    // filtering and the second fetching and rednering could be interupted by the first 
    // snackbar finishing and changing state.
    // I dont know the exact order and it seems complicated.
    // but for now, this solution seems to be working. 
    const [isProcessing, setIsProcessing] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenSnackbar(false);
    };

    // State to trigger the useEffect to fetch again 
    // when user deletes a Record 
    const [fetchAgain, setFetchAgain] = useState(null)


    let customersRowsArray
    let filteredCustomersRowsArray

     // Map over each customer and return a row object 
     // update 'rows:' property's value to customersRowsArray variable
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

    // Fetch the array of customers details from firestore
    // store the array of customer details in state
    useEffect(() => {
        console.log("Fetching records from firestore...")

        async function getCustomersArray() {
            const customersArray = await getDocs(collection(db, "customers"))
            setCustomersArray(customersArray.docs)
        }

        getCustomersArray()

    }, [fetchAgain])

    const navigate = useNavigate()

    if (!currentUser) {
        console.log("Error: not signed in. Redirecting to login page")
        return null
    }
            
    return (    
        <DashboardLayout>
            <DashboardNavbar />
            { customersArray && <Icon fontSize="large" title="Add Record" style={{cursor: "pointer", position: "absolute", right: "50%", top: "150px"}} onClick={() => navigate("/MOT-Records/new?newRecord=true&editMode=true")}>add_circle_icon</Icon> }
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
                                // { Header: "Assigned Inspector", accessor: "assigned_inspector", width: "9.9%" },
                                // { Header: "Additional Work Notes", accessor: "additional_work_notes", width: "9.9%" },
                                { Header: "",
                                  accessor: "view_details", 
                                  disableFilters: true,
                                  disableSortBy: true,
                                  className: "no-filter-icon",
                                  width: "5%", 
                                  Cell: ( { row } ) => (
                                    <div style={{display: "flex"}}>
                                        <Icon title="Edit Record" fontSize="small" style={{cursor: "pointer"}} onClick={() => navigate(`/MOT-Records/${row.original.id}?editMode=true`)}
                                        >
                                            edit_icon
                                        </Icon>
                                        <Icon title="View Record" fontSize="small" style={{cursor: "pointer", marginLeft: "5px"}} onClick={() => navigate(`/MOT-Records/${row.original.id}`)}
                                        >
                                            visibility_icon 
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