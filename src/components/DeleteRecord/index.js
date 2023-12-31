import React from "react"

import { updateDoc, doc, db } from "../../config/firebase.js"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Icon from "@mui/material/Icon";


export default function DeleteRecord( { setFetchAgain, row, setOpenSnackbar, isProcessing, setIsProcessing } ) {
    const [open, setOpen] = React.useState(false);
  
    function handleClickOpen() {
      setOpen(true);
    };
  
    function handleClose() {
      setOpen(false);
    };
  
    function handleConfirm() {      
        setIsProcessing(true)

        // Soft delete document in Firestore 
        const documentRef = doc(db, "customers", row.original.documentId)

        updateDoc(documentRef, { displayToUser: false })
        .then( () => {
            setFetchAgain(prevState => !prevState)
            setOpenSnackbar(true)

            // Wait for snackbar to disappear then enable all delete buttons
            setTimeout(() => {
                setIsProcessing(false)
            }, 1700)
        })
        .catch(error => console.log(`Error soft deleting document: ${error}`))
        
        setOpen(false);
    };
  
    return (
      <div>
        <Icon 
          title="Delete Record" 
          fontSize="small" 
          style={{cursor: "pointer", marginLeft: "5px"}} 
          onClick={() => {
            if (!isProcessing) {
                handleClickOpen()
            }
        }}
        >
            delete_icon
        </Icon>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Record?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  