/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview"

// Importing 'Current User' Context
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../AuthContext/AuthContext.js"

// Hook to protect non-signed-in access
import { useNavigateToSignInPage } from "../authentication/hooks/useNavigateToSignInPage.js"

// Importing firebase dependencies
import { collection, getDocs, db } from "../../config/firebase.js"

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const { currentUser } = useContext(AuthContext)
  console.log("Dashboard, Context value is:")
  console.log(currentUser)

  // registering useEffect
  useNavigateToSignInPage()
  // 

  const [currentWeekAppointments, setCurrentWeekAppointments] = useState("Loading...")

  // 'This Week's Appointments' count logic
    // download all records 
    // filter to keep only displayToUser true records (i.e only records that havent been soft deleted)
    // filter to keep only records where appointment date is this week 
  
  // Get the number of appointments for the current week
  useEffect(() => {
    async function getThisWeeksAppointmentsCount() {
      // download all records 
        const querySnapshot = await getDocs(collection(db, "customers"))
    
      // filter to keep only displayToUser true records
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
      
    
      // filter to keep only records where appointment date is this week 
      
      // Function to determine the start and end of the current week
      const getStartAndEndOfWeek = (date) => {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        start.setDate(start.getDate() - start.getDay());
    
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        end.setDate(end.getDate() + (6 - end.getDay()));
    
        return { start, end };
      };
    
      const currentDate = new Date();
      const { start, end } = getStartAndEndOfWeek(currentDate);
    
      // Function to convert "DD-MM-YYYY" string to a Date object
      const stringToDate = (dateStr) => {
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day);
      };
    
      // Filter the array based on start and end dates
      const nonDeletedRecords = getNonDeletedRecords()
      console.log("nonDeletedRecords:")
      console.log(nonDeletedRecords)
    
      const currentWeekAppointments = nonDeletedRecords.filter(record => {
    
      const stringBookingDate = record.customerDetails[4].value
      console.log(stringBookingDate)
    
        const bookingDate = stringToDate(stringBookingDate);  // Convert the string to a Date object
        console.log(bookingDate >= start && bookingDate <= end ? "True" : "False")
        return bookingDate >= start && bookingDate <= end;
      });
    
      console.log(currentWeekAppointments);  // Customers with bookings in the current week
      const count = currentWeekAppointments.length
      setCurrentWeekAppointments(count)
    }

    getThisWeeksAppointmentsCount()
  }, [])



  if (!currentUser) {
    console.log("Error: not signed in. Redirecting to login page")
    return null
  }
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Current Week Appointments"
                count={currentWeekAppointments}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
