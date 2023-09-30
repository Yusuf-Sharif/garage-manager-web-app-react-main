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

// Importing MUI Icons
import ScheduleIcon from '@mui/icons-material/Schedule';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const { currentUser } = useContext(AuthContext)
  console.log("Dashboard, Context value is:")
  console.log(currentUser)

  // registering useEffect
  useNavigateToSignInPage()
  // 

  const [dashboardData, setDashboardData] = useState(null)

  // 'Next Week's Appointments' count logic
    // download all records 
    // filter to keep only displayToUser true records (i.e only records that havent been soft deleted)
    // filter to keep only records where appointment date is next week
  
  // Get the number of appointments for next week
  useEffect(() => {
    async function getDashboardData() {
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
      
    
      // filter to keep only records where appointment date is next week
      
      // Function to determine the start and end of the next week
      // This code will ensure that the start date will always be the next Sunday after the given currentDate, 
      // regardless of what day of the week currentDate is on.

      const getStartAndEndOfNextWeek = (date) => {
        // Calculate days left in the current week
        const daysUntilNextSunday = 7 - date.getDay();

        // Set start to the next Sunday
        const start = new Date(date);
        start.setDate(start.getDate() + daysUntilNextSunday);
        start.setHours(0, 0, 0, 0);

        // Set end to the next Saturday
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        end.setHours(23, 59, 59, 999);

        return { start, end };
      };

const currentDate = new Date();
const { start, end } = getStartAndEndOfNextWeek(currentDate);

    
      // Function to convert "DD-MM-YYYY" string to a Date object
      const stringToDate = (dateStr) => {
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day);
      };
    
      // Filter the array based on start and end dates
      const nonDeletedRecords = getNonDeletedRecords()
      console.log("nonDeletedRecords:")
      console.log(nonDeletedRecords)
    
      const nextWeekAppointments = nonDeletedRecords.filter(record => {
    
      const stringBookingDate = record.customerDetails[4].value
      console.log(stringBookingDate)
    
        const bookingDate = stringToDate(stringBookingDate);  // Convert the string to a Date object
        console.log(bookingDate >= start && bookingDate <= end ? "True" : "False")
        return bookingDate >= start && bookingDate <= end;
      });
    
      console.log(nextWeekAppointments);  // Customers with bookings next week
      const nextWeekAppointmentsCount = nextWeekAppointments.length


      // Calculating number of unpaid invoices due next week
      // This uses the "Payment Status" property of the records to determine if it counts towards the unpaid invoices count.
      const unpaidInvoices = nextWeekAppointments.filter( appointment => {
        return appointment.costsAndBilling[3].value == "Unpaid"
      })

      const unpaidInvoicesCount = unpaidInvoices.length


      // Calculating Completed Services vs Scheduled Services
        // step 1 - gather all bookings for todays date
      
      // How can I get todays date in a string in the format of DD/MM/YYYY?
      function getTodaysDate() {
        const today = new Date();
        
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const year = today.getFullYear();
        
        return `${day}/${month}/${year}`;
      }

      const dateToday = getTodaysDate()

      const scheduledServices = nonDeletedRecords.filter( record => {
        return record.customerDetails[4].value === dateToday
      })
      

    // Step 2 

      // filter to keep only those scheduled services who have "pass" or "fail - 'comppleted services"
      const completedServices = scheduledServices.filter( record => {
        return record.motTestDetails[0].value != ""
      })


      const getDayOverDayComparison = () => {
        const completedServicesToday = completedServices

        // get yesterdays scheduled services
        function getYesterdaysDate() {
          const today = new Date();
          const yesterday = new Date(today);
          
          yesterday.setDate(today.getDate() - 1);
          
          const day = String(yesterday.getDate()).padStart(2, '0');
          const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Month is 0-based
          const year = yesterday.getFullYear();
          
          return `${day}/${month}/${year}`;
        }

        const dateYesterday = getYesterdaysDate()
        const scheduledServicesYesterday = nonDeletedRecords.filter( record => {
        return record.customerDetails[4].value === dateYesterday
      })

          // get yesterdays completed services
      const completedServicesYesterday = scheduledServicesYesterday.filter( record => {
        return record.motTestDetails[0].value != ""
      })

      const a = completedServicesToday.length - completedServicesYesterday.length
      const b = a / completedServicesYesterday.length
      const percentageChange = b * 100
      console.log("percentageChange:")
      console.log(percentageChange)

      return percentageChange 

      }

      getDayOverDayComparison()


      // Determine if the percentage change was positive or negative
      let typeOfPercentageChange = Math.sign(getDayOverDayComparison())
      
      if (typeOfPercentageChange === -1) {
        typeOfPercentageChange = "negative"
      } 
      else if (typeOfPercentageChange === 1) {
        typeOfPercentageChange = "positive"
      }
      else if (typeOfPercentageChange === 0) {
        typeOfPercentageChange = "positive"
      }


      const getTotalSalesToday = () => {
         // Getting Data for 'Today’s Revenue vs. 30 day Average'
        // Get todays revenue
        const todaysRecords = scheduledServices
        // map over each record and return the total bill number 
          // log of the result
        // take out the $ sign 
        // convert it the string to a number 
        // have array of numbers
        // add all the numbers up together 

        const totalBillsToday = todaysRecords.map( record => {
          // Checks if total bill exists and if bill has actually been paid
          if (record.costsAndBilling[2].value != "" && record.costsAndBilling[3].value === "Paid") {
            return record.costsAndBilling[2].value
          }
        })

        // filter out the undefineds
        const filteredTotalBillsToday = totalBillsToday.filter( record => {
          return record != undefined
        })

        // take out the $ sign 
        const dollarSignRemovedArray = filteredTotalBillsToday.map(item => item.substring(1));

        // convert string numbers to numbers
        const stringsToNumbers = dollarSignRemovedArray.map(item => +item);

        // add up all numbers of totalBillsToday
        let totalBillsTodayInteger = stringsToNumbers.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);


        console.log("today's total bills:")
        console.log(totalBillsTodayInteger)


        // Getting totalSalesPercentageChange
        return totalBillsTodayInteger
      }
     
      const getTotalSalesYesterday = () => {
      
          // getting yesterdays total sales
        // get yesterdays scheduled services
        function getYesterdaysDate() {
          const today = new Date();
          const yesterday = new Date(today);
          
          yesterday.setDate(today.getDate() - 1);
          
          const day = String(yesterday.getDate()).padStart(2, '0');
          const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Month is 0-based
          const year = yesterday.getFullYear();
          
          return `${day}/${month}/${year}`;
        }

        const dateYesterday = getYesterdaysDate()
        const scheduledServicesYesterday = nonDeletedRecords.filter( record => {
        return record.customerDetails[4].value === dateYesterday
      })

      const totalBillsYesterday = scheduledServicesYesterday.map( record => {
        if (record.costsAndBilling[2].value != "" && record.costsAndBilling[3].value === "Paid") {
          return record.costsAndBilling[2].value
        }
      })

      // filter out the undefineds
      const filteredTotalBillsYesterday = totalBillsYesterday.filter( record => {
        return record != undefined
      })

      // take out the $ sign 
      const yesterdayDollarSignRemovedArray = filteredTotalBillsYesterday.map(item => item.substring(1));

      // convert string numbers to numbers
      const yesterdayStringsToNumbers = yesterdayDollarSignRemovedArray.map(item => +item);

      // add up all numbers of totalBillsYesterday
      const totalBillsYesterdayInteger = yesterdayStringsToNumbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);


      return totalBillsYesterdayInteger

      }

      const totalSalesToday = getTotalSalesToday()
      const totalSalesYesterday = getTotalSalesYesterday()

      console.log("total sales yesterday:")
      console.log(totalSalesYesterday)
     

      // Compare yesterdays sales to today's sales
      const compareYesterdaySalesToTodaySales = () => {
        const a = totalSalesToday - totalSalesYesterday
        const b = a / totalSalesYesterday
        let percentageChangeYesterdayToToday = b * 100
        // fixing decimal to two places
        percentageChangeYesterdayToToday = +percentageChangeYesterdayToToday.toFixed(2)
  
        // Determine if the percentage change was positive or negative
        let typeOfPercentageChangeYesterdayToToday = Math.sign(percentageChangeYesterdayToToday)
        
        if (typeOfPercentageChangeYesterdayToToday === -1) {
          typeOfPercentageChangeYesterdayToToday = "negative"
        } 
        else if (typeOfPercentageChangeYesterdayToToday === 1) {
          typeOfPercentageChangeYesterdayToToday = "positive"
        }
        else if (typeOfPercentageChangeYesterdayToToday === 0) {
          typeOfPercentageChangeYesterdayToToday = "positive"
        }

        return { percentageChangeYesterdayToToday, typeOfPercentageChangeYesterdayToToday }

      }
      
      const { percentageChangeYesterdayToToday, typeOfPercentageChangeYesterdayToToday } = compareYesterdaySalesToTodaySales()

      // Update state to reload component and display the data
      setDashboardData(prevState => ({
        ...prevState,
        nextWeekAppointmentsCount,
        unpaidInvoicesCount,
        completedServicesVsScheduledServices: {
          scheduledServices,
          completedServices,
          typeOfPercentageChange
        },
        completedServicesPercentageChange: getDayOverDayComparison(),
        revenue: {
          totalSalesToday,
          percentageChangeYesterdayToToday,
          typeOfPercentageChangeYesterdayToToday
        }
      })
      )

    }

    getDashboardData()
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
                icon={<CalendarMonthIcon />}
                title="Next Week's Appointments"
                count={dashboardData?.nextWeekAppointmentsCount}
                percentage={{
                  color: "info",
                  amount: dashboardData?.unpaidInvoicesCount,
                  label: `unpaid ${dashboardData?.unpaidInvoicesCount != 1 ? "invoices" : "invoice"} due next week.`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<CarRepairIcon />}
                title="Today's Completed Services"
                count={dashboardData ? `${dashboardData.completedServicesVsScheduledServices.completedServices.length} / ${dashboardData.completedServicesVsScheduledServices.scheduledServices.length}` : "loading" }
                percentage={{
                  color: dashboardData ? 
                        dashboardData.completedServicesVsScheduledServices.typeOfPercentageChange === "positive" ? "success" : "warning" 
                        : "success",
                  amount: dashboardData ? 
                          dashboardData.completedServicesVsScheduledServices.typeOfPercentageChange === "positive" ? `+${dashboardData.completedServicesPercentageChange}%` : `${dashboardData.completedServicesPercentageChange}%`
                          : "loading",
                  label: `${dashboardData ? 
                            dashboardData.completedServicesVsScheduledServices.typeOfPercentageChange === "positive" ? "more " : "less "
                            :
                          "..."}services than yesterday`,
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
                count={dashboardData ? `$${dashboardData.revenue.totalSalesToday}` : "loading"}
                percentage={{
                  color: dashboardData ? 
                          dashboardData.revenue.typeOfPercentageChangeYesterdayToToday === "positive" ? "success" : "warning" 
                          : "success",
                  amount: dashboardData ? 
                          dashboardData.revenue.typeOfPercentageChangeYesterdayToToday === "positive" ? `+${dashboardData.revenue.percentageChangeYesterdayToToday}%` : `${dashboardData.revenue.percentageChangeYesterdayToToday}%`
                          : "loading",
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
