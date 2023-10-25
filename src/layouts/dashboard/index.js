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

// Importing 'Current User' Context
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../AuthContext/AuthContext.js"

// Hook to protect non-signed-in access
import { useNavigateToSignInPage } from "../authentication/hooks/useNavigateToSignInPage.js"

// Importing MUI Icons
import CarRepairIcon from '@mui/icons-material/CarRepair';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

// Importing data fetching hook
import { useGetNonDeletedRecords } from "../hooks/useGetNonDeletedRecords.js"

function Dashboard() {

  const [dashboardData, setDashboardData] = useState(null)
  const [nonDeletedRecords, setNonDeletedRecords] = useState([])

  const { currentUser } = useContext(AuthContext)
  const { records } = useGetNonDeletedRecords()

  // registering useEffect
  useNavigateToSignInPage()
  // 

  // Update state once records have been fetched 
  useEffect(() => {
    setNonDeletedRecords(records)
  }, [records])

  // Prepare data to be displayed once records have been fetched
  useEffect(() => {
    async function getDashboardData() {
      
      // ======== Calculating number of unpaid invoices due next week ======== // 

      function getNextWeekAppointments() {
        // Determines the start (upcoming Sunday) and end of next week based on the given currentDate
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
  
        // Converts record "DD-MM-YYYY" formatted string to a Date object.
        const stringToDate = (dateStr) => {
          const [day, month, year] = dateStr.split("/").map(Number);
          return new Date(year, month - 1, day);
        };
      
        // Filter the array based on start and end dates    
        const nextWeekAppointments = nonDeletedRecords.filter(record => {
      
        const stringBookingDate = record.customerDetails[4].value
        
      
          const bookingDate = stringToDate(stringBookingDate);  // Convert the string to a Date object
          
          return bookingDate >= start && bookingDate <= end;
        });
      
        const nextWeekAppointmentsCount = nextWeekAppointments.length
        return { nextWeekAppointments, nextWeekAppointmentsCount }
      }
      
      const { nextWeekAppointments, nextWeekAppointmentsCount } = getNextWeekAppointments()

      const unpaidInvoicesDueNextWeek = nextWeekAppointments.filter( appointment => {
        return appointment.costsAndBilling[3].value == "Unpaid"
      })
      const unpaidInvoicesDueNextWeekCount = unpaidInvoicesDueNextWeek.length

      // ======== Calculating Completed Services Today vs Scheduled Services ======== //
      function calculateCompletedServicesTodayVsScheduledServicesToday() {
        
        // Get todays date in the format of "DD/MM/YYYY"
        function getTodaysDate() {
          const today = new Date();
          
          const day = String(today.getDate()).padStart(2, '0');
          const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based
          const year = today.getFullYear();
          
          return `${day}/${month}/${year}`;
        }

        const dateToday = getTodaysDate()

        const scheduledServicesToday = nonDeletedRecords.filter( record => {
          return record.customerDetails[4].value === dateToday
        })

        const completedServicesToday = scheduledServicesToday.filter( record => {
          return record.motTestDetails[0].value != ""
        })

        return { completedServicesToday, scheduledServicesToday }
      }

      const { completedServicesToday, scheduledServicesToday } = calculateCompletedServicesTodayVsScheduledServicesToday()

      // ======== Calculating percentage change from yesterday completed services to today's ======== //
      const calculatePercentageChangeInCompletedServices  = () => {        
        // Get yesterday's date in the format of "DD/MM/YYYY"
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

        const completedServicesYesterday = scheduledServicesYesterday.filter( record => {
          return record.motTestDetails[0].value != ""
        })

        // const a = completedServicesToday.length - completedServicesYesterday.length
        // const b = a / completedServicesYesterday.length
        // let percentageChange = b * 100
        // percentageChange = percentageChange.toFixed(2)

        // Calculate the difference in completed services between today and yesterday
        const serviceDifference = completedServicesToday.length - completedServicesYesterday.length;

        // Calculate the percentage change based on yesterday's completed services count
        const changeRatio = serviceDifference / completedServicesYesterday.length;
        const percentageChangeValue = changeRatio * 100;

        // Format the percentage change to two decimal places
        const formattedPercentageChange = percentageChangeValue.toFixed(2);

        return formattedPercentageChange 

      }

      // getDayOverDayComparison
  
      // Determine if the percentage change was positive or negative
      let typeOfPercentageChange = Math.sign(calculatePercentageChangeInCompletedServices())
      
      if (typeOfPercentageChange === -1) {
        typeOfPercentageChange = "negative"
      } 
      else if (typeOfPercentageChange === 1) {
        typeOfPercentageChange = "positive"
      }
      else if (typeOfPercentageChange === 0) {
        typeOfPercentageChange = "positive"
      }
      
      // ======== Calculating Total Sales Today ======== //
      // const getTotalSalesToday = () => {
      //   const todaysRecords = scheduledServicesToday
      //   // map over each record and return the total bill number 
      //     // log of the result
      //   // take out the $ sign 
      //   // convert it the string to a number 
      //   // have array of numbers
      //   // add all the numbers up together 

      //   const totalBillsToday = todaysRecords.map( record => {
      //     // Checks if total bill exists and if bill has actually been paid
      //     if (record.costsAndBilling[2].value != "" && record.costsAndBilling[3].value === "Paid") {
      //       return record.costsAndBilling[2].value
      //     }
      //   })

      //   // filter out the undefineds
      //   const filteredTotalBillsToday = totalBillsToday.filter( record => {
      //     return record != undefined
      //   })

      //   // take out the $ sign 
      //   const dollarSignRemovedArray = filteredTotalBillsToday.map(item => item.substring(1));

      //   // convert string numbers to numbers
      //   const stringsToNumbers = dollarSignRemovedArray.map(item => +item);

      //   // add up all numbers of totalBillsToday
      //   let totalBillsTodayInteger = stringsToNumbers.reduce((accumulator, currentValue) => {
      //     return accumulator + currentValue;
      //   }, 0);


        


      //   // Getting totalSalesPercentageChange
      //   return totalBillsTodayInteger
      // }

      const getTotalSalesToday = () => {
        // Filter out records that have valid bill values and are marked as "Paid"
        const validBills = scheduledServicesToday
            .filter(record => 
                record.costsAndBilling[2].value !== "" && 
                record.costsAndBilling[3].value === "Paid")
            .map(record => record.costsAndBilling[2].value);
    
        // Convert dollar string to number and accumulate total
        const totalSales = validBills
            .map(dollarString => parseFloat(dollarString.substring(1)))
            .reduce((accumulator, value) => accumulator + value, 0);
    
        return totalSales;
    }
    
      // const getTotalSalesYesterday = () => {
      
      //     // getting yesterdays total sales
      //   // get yesterdays scheduled services
      //   function getYesterdaysDate() {
      //     const today = new Date();
      //     const yesterday = new Date(today);
          
      //     yesterday.setDate(today.getDate() - 1);
          
      //     const day = String(yesterday.getDate()).padStart(2, '0');
      //     const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Month is 0-based
      //     const year = yesterday.getFullYear();
          
      //     return `${day}/${month}/${year}`;
      //   }

      //   const dateYesterday = getYesterdaysDate()
      //   const scheduledServicesYesterday = nonDeletedRecords.filter( record => {
      //   return record.customerDetails[4].value === dateYesterday
      // })

      // const totalBillsYesterday = scheduledServicesYesterday.map( record => {
      //   if (record.costsAndBilling[2].value != "" && record.costsAndBilling[3].value === "Paid") {
      //     return record.costsAndBilling[2].value
      //   }
      // })

      // // filter out the undefineds
      // const filteredTotalBillsYesterday = totalBillsYesterday.filter( record => {
      //   return record != undefined
      // })

      // // take out the $ sign 
      // const yesterdayDollarSignRemovedArray = filteredTotalBillsYesterday.map(item => item.substring(1));

      // // convert string numbers to numbers
      // const yesterdayStringsToNumbers = yesterdayDollarSignRemovedArray.map(item => +item);

      // // add up all numbers of totalBillsYesterday
      // const totalBillsYesterdayInteger = yesterdayStringsToNumbers.reduce((accumulator, currentValue) => {
      //   return accumulator + currentValue;
      // }, 0);


      // return totalBillsYesterdayInteger

      // }

      const getTotalSalesYesterday = () => {
        // Returns yesterday's date in DD/MM/YYYY format.
        function getYesterdaysDate() {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
    
            const day = String(yesterday.getDate()).padStart(2, '0');
            const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Month is 0-based
            const year = yesterday.getFullYear();
    
            return `${day}/${month}/${year}`;
        }
    
        // Filter services scheduled for yesterday
        const dateYesterday = getYesterdaysDate();
        const scheduledServicesYesterday = nonDeletedRecords.filter(record => 
            record.customerDetails[4].value === dateYesterday
        );
    
        // Get total bills from yesterday's services which are paid
        const totalBillsYesterday = scheduledServicesYesterday
            .filter(record => 
                record.costsAndBilling[2].value !== "" && record.costsAndBilling[3].value === "Paid"
            )
            .map(record => record.costsAndBilling[2].value);
    
        // Remove the $ sign from bill amounts
        const billAmountsWithoutDollarSign = totalBillsYesterday.map(item => item.substring(1));
    
        // Convert bill amounts from string to number
        const billAmountsAsNumbers = billAmountsWithoutDollarSign.map(item => parseFloat(item));
    
        // Calculate total sales from yesterday
        const totalSalesYesterday = billAmountsAsNumbers.reduce((accumulator, currentValue) => 
            accumulator + currentValue, 
            0
        );
    
        return totalSalesYesterday;
    }
    
      const totalSalesToday = getTotalSalesToday()
      const totalSalesYesterday = getTotalSalesYesterday()


      // ======== Comparing Today against Yesterday's Sales ======== //

      const compareYesterdaySalesToTodaySales = () => {
        // const a = totalSalesToday - totalSalesYesterday
        // const b = a / totalSalesYesterday
        // let percentageChangeYesterdayToToday = b * 100
        // // fixing decimal to two places
        // percentageChangeYesterdayToToday = +percentageChangeYesterdayToToday.toFixed(2)

        // Calculate the difference in sales between today and yesterday
        const salesDifference = totalSalesToday - totalSalesYesterday;

        // Determine the percentage change based on yesterday's sales
        const percentageChangeRaw = (salesDifference / totalSalesYesterday) * 100;

        // Format the percentage change to two decimal places and convert back to number
        const formattedPercentageChangeYesterdayToToday = +percentageChangeRaw.toFixed(2);

        // Determine if the percentage change was positive or negative
        let typeOfPercentageChangeYesterdayToToday = Math.sign(formattedPercentageChangeYesterdayToToday)
        
        if (typeOfPercentageChangeYesterdayToToday === -1) {
          typeOfPercentageChangeYesterdayToToday = "negative"
        } 
        else if (typeOfPercentageChangeYesterdayToToday === 1) {
          typeOfPercentageChangeYesterdayToToday = "positive"
        }
        else if (typeOfPercentageChangeYesterdayToToday === 0) {
          typeOfPercentageChangeYesterdayToToday = "positive"
        }

        return { formattedPercentageChangeYesterdayToToday, typeOfPercentageChangeYesterdayToToday }
  
      }
      
      const { formattedPercentageChangeYesterdayToToday, typeOfPercentageChangeYesterdayToToday } = compareYesterdaySalesToTodaySales()


      // ======== Data for component "Unpaid Invoices" ======== / 
      const customersBookedToday = scheduledServicesToday
      const unpaidInvoicesToday = customersBookedToday.filter( customer => {
        // Filter to return customers where a bill exists, but payment is not "Paid"
        return customer.costsAndBilling[2].value != "" && customer.costsAndBilling[3].value != "Paid"
      })

  
      // ======== Data for "This Week's Revenue-Per-Day" Bar Chart component ======== // 

      function getDateOfThisWeek(dayName) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        
        const currentDayIndex = today.getDay();
        const targetDayIndex = days.indexOf(dayName);
      
        if (targetDayIndex === -1) {
          throw new Error("Invalid day name provided.");
        }
      
        let daysDifference;
        if (targetDayIndex > currentDayIndex) {
          daysDifference = targetDayIndex - currentDayIndex;
        } else {
          daysDifference = targetDayIndex - currentDayIndex;
        }
      
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + daysDifference);
        
        const day = String(targetDate.getDate()).padStart(2, '0');
        const month = String(targetDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const year = targetDate.getFullYear();
        
        return `${day}/${month}/${year}`;
      }     
      
      const getTotalRevenueOfDay = (dateFetcherFn) => {
        const thisDate = dateFetcherFn()
      
        // Filter to return records of specified date
        const thisDateRecords = nonDeletedRecords.filter( record => {
          return record.customerDetails[4].value === thisDate
        })

        // Filter customers to those with bills paid 
        const thisDateRecordsPaid = thisDateRecords.filter( record => {
          return record.costsAndBilling[2].value != "" && record.costsAndBilling[3].value === "Paid"
        })

        // Gather all paid bills of specified date
        const thisDateBillsArray = thisDateRecordsPaid.map( record => {
          return record.costsAndBilling[2].value
        })

        // Remove $ sign   
        const thisDateBillsArrayDollarSignRemovedArray = thisDateBillsArray.map(item => item.substring(1));

        // Convert string numbers to numbers
        const thisDateBillsArrayStringsToNumbers = thisDateBillsArrayDollarSignRemovedArray.map(item => +item);

        // Add up all numbers
        const thisDateTotalRevenue = thisDateBillsArrayStringsToNumbers.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);

        return thisDateTotalRevenue

      }

      const thisSundayTotalRevenue = getTotalRevenueOfDay(() => getDateOfThisWeek("Sunday"))

      const thisMondayTotalRevenue = getTotalRevenueOfDay(() => getDateOfThisWeek("Monday"))

      const thisTuesdayTotalRevenue = getTotalRevenueOfDay(() => getDateOfThisWeek("Tuesday"))
  
      const thisWednesdayTotalRevenue = getTotalRevenueOfDay(() => getDateOfThisWeek("Wednesday"))

      const thisThursdayTotalRevenue = getTotalRevenueOfDay(() => getDateOfThisWeek("Thursday"))

      const thisFridayTotalRevenue = getTotalRevenueOfDay(() => getDateOfThisWeek("Friday"))

      const thisSaturdayTotalRevenue = getTotalRevenueOfDay(() => getDateOfThisWeek("Saturday"))


      // Structuring the data to be used in the bar chart 
      const dailyRevenueBarChartData = {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: { 
          label: "Total Revenue", 
          data: [thisSundayTotalRevenue,
                 thisMondayTotalRevenue, 
                 thisTuesdayTotalRevenue, 
                 thisWednesdayTotalRevenue, 
                 thisThursdayTotalRevenue, 
                 thisFridayTotalRevenue, 
                 thisSaturdayTotalRevenue] 
                },
      }


      // ======== Data for "This Week's Services-Completed-Per-Day" Line Chart component ======== // 
       
          function getCompletedServices(day) {
          // Filter to return the specified day's records
            const thisDayRecords = nonDeletedRecords.filter( record => {
            return record.customerDetails[4].value === getDateOfThisWeek(day)
          })
        
          // Filter to return where the service was completed
            const thisDayRecordsCompletedServices = thisDayRecords.filter( record => {
              return record.motTestDetails[0].value != ""
            })

          return thisDayRecordsCompletedServices.length
        }

        const thisSundayCompletedServices = getCompletedServices("Sunday")
        const thisMondayCompletedServices = getCompletedServices("Monday")
        const thisTuesdayCompletedServices = getCompletedServices("Tuesday")
        const thisWednesdayCompletedServices = getCompletedServices("Wednesday")
        const thisThursdayCompletedServices = getCompletedServices("Thursday")
        const thisFridayCompletedServices = getCompletedServices("Friday")
        const thisSaturdayCompletedServices = getCompletedServices("Saturday")

        // Structuring the data to be used in the line chart 
        const completedServicesLineChartData = {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: { 
            label: "Completed Services", 
            data: [thisSundayCompletedServices, 
                  thisMondayCompletedServices, 
                  thisTuesdayCompletedServices, 
                  thisWednesdayCompletedServices, 
                  thisThursdayCompletedServices, 
                  thisFridayCompletedServices, 
                  thisSaturdayCompletedServices] 
                },
        }




      // Update state to reload component and display the data
      setDashboardData(prevState => ({
        ...prevState,
        nextWeekAppointmentsCount,
        unpaidInvoicesDueNextWeekCount,
        completedServicesVsScheduledServices: {
          scheduledServicesToday,
          completedServicesToday,
          typeOfPercentageChange
        },
        completedServicesPercentageChange: calculatePercentageChangeInCompletedServices(),
        revenue: {
          totalSalesToday,
          formattedPercentageChangeYesterdayToToday,
          typeOfPercentageChangeYesterdayToToday
        },
        unpaidInvoicesToday,
        dailyRevenueBarChartData,
        completedServicesLineChartData
      })
      )

    }

    getDashboardData()
  }, [nonDeletedRecords])



  if (!currentUser) {
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
                color="success"
                icon="store"
                title="Revenue"
                count={dashboardData ? `$${dashboardData.revenue.totalSalesToday}` : "loading"}
                percentage={{
                  color: dashboardData ? 
                          dashboardData.revenue.typeOfPercentageChangeYesterdayToToday === "positive" ? "success" : "warning" 
                          : "success",
                  amount: dashboardData ? 
                          dashboardData.revenue.typeOfPercentageChangeYesterdayToToday === "positive" ? `+${dashboardData.revenue.formattedPercentageChangeYesterdayToToday}%` : `${dashboardData.revenue.formattedPercentageChangeYesterdayToToday}%`
                          : "loading",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<CarRepairIcon />}
                title="Today's Completed Services"
                count={dashboardData ? `${dashboardData.completedServicesVsScheduledServices.completedServicesToday.length} / ${dashboardData.completedServicesVsScheduledServices.scheduledServicesToday.length}` : "loading" }
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
                color="warning"
                icon={<ReceiptLongIcon />}
                title="Unpaid Invoices"
                count={dashboardData ? `${dashboardData.unpaidInvoicesToday.length} today` : "Loading..."}
                percentage={{
                  color:  "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<CalendarMonthIcon />}
                title="Next Week's Appointments"
                count={dashboardData?.nextWeekAppointmentsCount}
                percentage={{
                  color: "info",
                  amount: dashboardData?.unpaidInvoicesDueNextWeekCount,
                  label: `unpaid ${dashboardData?.unpaidInvoicesDueNextWeek != 1 ? "invoices" : "invoice"} due next week.`,
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
                  color="success"
                  title="Daily Revenue"
                  description="Total revenue for each day this week"
                  date="just updated"
                  chart={dashboardData ? dashboardData.dailyRevenueBarChartData : {}}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="daily services"
                  description={
                    <>
                      Total services completed for each day this week
                    </>
                  }
                  date="just updated"
                  chart={dashboardData ? dashboardData.completedServicesLineChartData : {}}
                />
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
