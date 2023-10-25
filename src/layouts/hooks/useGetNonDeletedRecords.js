import { useState, useEffect } from 'react';

// Importing firebase dependencies
import { collection, getDocs, db } from "../../config/firebase.js"

export function useGetNonDeletedRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRecords() {
            try {
                const querySnapshot = await getDocs(collection(db, "customers"));
                const filteredRecords = querySnapshot.docs.filter(doc => doc.data().displayToUser);
                const recordDataArray = filteredRecords.map(doc => doc.data());
                setRecords(recordDataArray);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchRecords();
    }, []);

    return { records, loading, error };
}
