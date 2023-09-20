export const customers = [
    {
        customerDetails: [
            { label: "Name", value: "Robert Smith" },
            { label: "Address", value: "123 Main St, Springfield" },
            { label: "Email", value: "robertsmith@email.com" },
            { label: "Phone", value: "020 7946 0958" },
            { label: "Historical Data", value: "Pass on 15/09/2022 with no advisories" },
            { label: "Retests", value: "No retests" },
          ],
        
        appointmentDetails: [
            { label: "Booking Date", value: "10/09/2023" },
            { label: "Booking Time", value: "14:30" }
          ],
      
        motStatus: "Passed",
        
        // vehicleIdentification: [
        //     { label: "V.I.N", value: "1HGCM82633A004352" },
        //     { label: "License Plate", value: "ABC-1234" }
        //   ],
          
          vehicleDetails: [
            { label: "V.I.N", value: "1HGCM82633A004352" },
            { label: "License Plate", value: "ABC-1234" },
            { label: "Year of Manufacture", value: 2020 },
            { label: "Manufacturer", value: "Toyota" },
            { label: "Model", value: "Camry" },
            { label: "Derivative", value: "Camry LE" }, 
            { label: "Fuel Type", value: "Petrol" },
            { label: "Vehicle Category", value: "Car" },
            { label: "Vehicle Color", value: "Metallic Blue" },
            { label: "Engine Size", value: "2.5L" },
            { label: "Drive Type", value: "Front-Wheel Drive" },
            { label: "Body Type", value: "Sedan" },
            { label: "Number of Doors", value: 4 },
            { label: "Number of Seats", value: 5 }
          ],
          
          motTestDetails: [
            { label: "Test Result", value: "Pass" },
            { label: "Expiry Date", value: "15/09/2024" },
            { label: "Date of Test", value: "03/09/2023" },
            { label: "MOT Test Number", value: "MOT12345678" },
            { label: "Reasons for Failure", value: "N/A" },
            { label: "Advisory Notes", value: "Tire tread nearing minimum limit" },
            { label: "Inspector's Name", value: "John Doe" },
            { label: "Additional Work Notes", value: "Vehicle well-maintained" },
            { label: "Categories of defects", value: "Minor" },
            { label: "Recommendations", value: "Safe to drive" },
            { label: "Next Service Date", value: "15/03/2024" },
            { label: "Maintenance & Repairs", value: "Oil Change, Brake pad replacement" },
            { label: "Future Maintenance Tips", value: "Consider tire replacement in the next 5000 miles" },
          ],
      
        //   testResultsAndAdvisories: [
        //     { label: "Categories of defects", value: "Minor" },
        //     { label: "Recommendations", value: "Safe to drive" },
        //     { label: "Next Service Date", value: "15/03/2024" },
        //     { label: "Future Maintenance Tips", value: "Consider tire replacement in the next 5000 miles" }
        //   ],
          
          emissionDetails: [
            { label: "CO2 Emissions", value: "120 g/km" },
            { label: "Emission Test Results", value: "Pass" }
          ],    
          
        //   inspectorsNotes: [
        //     { label: "Personal Observations", value: "Vehicle well-maintained" },
        //     { label: "Tester's Name and Signature", value: "John Doe" }
        //   ],
      
        //   additionalWorkDone: [
        //     { label: "Details", value: "Oil Change, Brake pad replacement" }
        //   ],    
          
          costsAndBilling: [
            { label: "Test Cost", value: "$50" },
            { label: "Repair Costs", value: "$200 for brake pads" },
            { label: "Total Bill", value: "$250" },
            { label: "Payment Status", value: "Paid" }
          ],    
          
        //   previousTestResults: [
        //     { label: "Historical Data", value: "Pass on 15/09/2022 with no advisories" },
        //     { label: "Retests", value: "No retests" }
        //   ],
        },

    {
        customerDetails: [
            { label: "Name", value: "John Doe" },
            { label: "Address", value: "456 Elm St, Rivertown" },
            { label: "Email", value: "johndoe@email.com" },
            { label: "Phone", value: "020 8837 5684" }
            ],
        
        appointmentDetails: [
            { label: "Booking Date", value: "12/09/2023" },
            { label: "Booking Time", value: "16:00" }
            ],
        
        motStatus: "Failed",
        
        vehicleIdentification: [
            { label: "V.I.N", value: "2JGKD92645B005768" },
            { label: "License Plate", value: "XYZ-5678" }
            ],
            
            vehicleDetails: [
            { label: "Year of Manufacture", value: 2019 },
            { label: "Manufacturer", value: "Honda" },
            { label: "Model", value: "Civic" },
            { label: "Derivative", value: "Civic LX" }, 
            { label: "Fuel Type", value: "Diesel" },
            { label: "Vehicle Category", value: "Car" },
            { label: "Vehicle Color", value: "Bright Red" },
            { label: "Engine Size", value: "2.0L" },
            { label: "Drive Type", value: "All-Wheel Drive" },
            { label: "Body Type", value: "Hatchback" },
            { label: "Number of Doors", value: 4 },
            { label: "Number of Seats", value: 5 }
            ],
            
            motTestDetails: [
            { label: "Test Result", value: "Fail" },
            { label: "Expiry Date", value: "16/09/2024" },
            { label: "Date of Test", value: "05/09/2023" },
            { label: "MOT Test Number", value: "MOT87654321" },
            { label: "Reasons for Failure", value: "Broken taillight" },
            { label: "Advisory Notes", value: "Replace air filters" },
            { label: "Inspector's Name", value: "Alice Johnson" },
            { label: "Additional Work Notes", value: "Vehicle shows signs of wear and tear" },
            ],
        
            testResultsAndAdvisories: [
            { label: "Categories of defects", value: "Major" },
            { label: "Recommendations", value: "Not safe to drive without repair" },
            { label: "Next Service Date", value: "17/03/2024" },
            { label: "Future Maintenance Tips", value: "Monitor tire pressure regularly" }
            ],
            
            emissionDetails: [
            { label: "CO2 Emissions", value: "130 g/km" },
            { label: "Emission Test Results", value: "Fail" }
            ],    
            
            inspectorsNotes: [
            { label: "Personal Observations", value: "Vehicle shows signs of wear and tear" },
            { label: "Tester's Name and Signature", value: "Alice Johnson" }
            ],
        
            additionalWorkDone: [
            { label: "Details", value: "Changed air filters, Filled tire pressure" }
            ],    
            
            costsAndBilling: [
            { label: "Test Cost", value: "$55" },
            { label: "Repair Costs", value: "$100 for air filters" },
            { label: "Total Bill", value: "$155" },
            { label: "Payment Status", value: "Pending" }
            ],    
            
            previousTestResults: [
            { label: "Historical Data", value: "Pass on 14/09/2022 with advisories" },
            { label: "Retests", value: "One retest on 20/09/2022" }
            ]
        },
        
    {
        customerDetails: [
            { label: "Name", value: "Jane Adams" },
            { label: "Address", value: "789 Maple Rd, Watertown" },
            { label: "Email", value: "janeadams@email.com" },
            { label: "Phone", value: "020 4545 8989" }
            ],
        
        appointmentDetails: [
            { label: "Booking Date", value: "15/09/2023" },
            { label: "Booking Time", value: "10:30" }
            ],
        
        motStatus: "Passed",
        
        vehicleIdentification: [
            { label: "V.I.N", value: "3LZKD94756C006981" },
            { label: "License Plate", value: "LMN-9101" }
            ],
            
            vehicleDetails: [
            { label: "Year of Manufacture", value: 2018 },
            { label: "Manufacturer", value: "Ford" },
            { label: "Model", value: "Focus" },
            { label: "Derivative", value: "Focus ST" }, 
            { label: "Fuel Type", value: "Hybrid" },
            { label: "Vehicle Category", value: "Car" },
            { label: "Vehicle Color", value: "Emerald Green" },
            { label: "Engine Size", value: "1.8L" },
            { label: "Drive Type", value: "Rear-Wheel Drive" },
            { label: "Body Type", value: "Hatchback" },
            { label: "Number of Doors", value: 5 },
            { label: "Number of Seats", value: 5 }
            ],
            
            motTestDetails: [
            { label: "Test Result", value: "Pass" },
            { label: "Expiry Date", value: "15/09/2024" },
            { label: "Date of Test", value: "07/09/2023" },
            { label: "MOT Test Number", value: "MOT11223344" },
            { label: "Reasons for Failure", value: "" },
            { label: "Advisory Notes", value: "Slight rusting undercarriage" },
            { label: "Inspector's Name", value: "Mark Thompson" },
            { label: "Additional Work Notes", value: "Vehicle is in great condition" },
            ],
        
            testResultsAndAdvisories: [
            { label: "Categories of defects", value: "Minor" },
            { label: "Recommendations", value: "Safe to drive" },
            { label: "Next Service Date", value: "20/03/2024" },
            { label: "Future Maintenance Tips", value: "Regular servicing" }
            ],
            
            emissionDetails: [
            { label: "CO2 Emissions", value: "100 g/km" },
            { label: "Emission Test Results", value: "Pass" }
            ],    
            
            inspectorsNotes: [
            { label: "Personal Observations", value: "Vehicle is in great condition" },
            { label: "Tester's Name and Signature", value: "Mark Thompson" }
            ],
        
            additionalWorkDone: [
            { label: "Details", value: "Tire rotation" }
            ],    
            
            costsAndBilling: [
            { label: "Test Cost", value: "$60" },
            { label: "Repair Costs", value: "$0" },
            { label: "Total Bill", value: "$60" },
            { label: "Payment Status", value: "Paid" }
            ],    
            
            previousTestResults: [
            { label: "Historical Data", value: "Pass on 16/09/2022" },
            { label: "Retests", value: "No retests" }
            ]
        },

    {
        customerDetails: [
            { label: "Name", value: "Bill Smith" },
            { label: "Address", value: "123 Pine St, Oaktown" },
            { label: "Email", value: "robertsmith@email.com" },
            { label: "Phone", value: "020 7689 1234" }
            ],
        
        appointmentDetails: [
            { label: "Booking Date", value: "18/09/2023" },
            { label: "Booking Time", value: "14:15" }
            ],
        
        motStatus: "Failed",
        
        vehicleIdentification: [
            { label: "V.I.N", value: "4MZXG05867D007392" },
            { label: "License Plate", value: "OPQ-3456" }
            ],
            
            vehicleDetails: [
            { label: "Year of Manufacture", value: 2020 },
            { label: "Manufacturer", value: "Toyota" },
            { label: "Model", value: "Corolla" },
            { label: "Derivative", value: "Corolla XSE" }, 
            { label: "Fuel Type", value: "Petrol" },
            { label: "Vehicle Category", value: "Car" },
            { label: "Vehicle Color", value: "Midnight Blue" },
            { label: "Engine Size", value: "2.2L" },
            { label: "Drive Type", value: "Front-Wheel Drive" },
            { label: "Body Type", value: "Sedan" },
            { label: "Number of Doors", value: 4 },
            { label: "Number of Seats", value: 5 }
            ],
            
            motTestDetails: [
            { label: "Test Result", value: "Fail" },
            { label: "Expiry Date", value: "18/09/2024" },
            { label: "Date of Test", value: "08/09/2023" },
            { label: "MOT Test Number", value: "MOT55667788" },
            { label: "Reasons for Failure", value: "Brake pad wear" },
            { label: "Advisory Notes", value: "Oil change recommended" },
            { label: "Inspector's Name", value: "Lucy Walters" },
            { label: "Additional Work Notes", value: "Minor scratches on side door" },
            ],
        
            testResultsAndAdvisories: [
            { label: "Categories of defects", value: "Major" },
            { label: "Recommendations", value: "Immediate repair required" },
            { label: "Next Service Date", value: "22/04/2024" },
            { label: "Future Maintenance Tips", value: "Check alignment" }
            ],
            
            emissionDetails: [
            { label: "CO2 Emissions", value: "110 g/km" },
            { label: "Emission Test Results", value: "Pass" }
            ],    
            
            inspectorsNotes: [
            { label: "Tester's Name and Signature", value: "Lucy Walters" },
            { label: "Personal Observations", value: "Minor scratches on side door" },
            ],
        
            additionalWorkDone: [
            { label: "Details", value: "Replaced windshield wipers" }
            ],    
            
            costsAndBilling: [
            { label: "Test Cost", value: "$65" },
            { label: "Repair Costs", value: "$45 for brake pads" },
            { label: "Total Bill", value: "$110" },
            { label: "Payment Status", value: "Pending" }
            ],    
            
            previousTestResults: [
            { label: "Historical Data", value: "Fail on 17/09/2022 due to engine issues" },
            { label: "Retests", value: "One retest on 23/09/2022" }
            ]
        },

    {
        customerDetails: [
            { label: "Name", value: "Emily Johnson" },
            { label: "Address", value: "456 Oak Lane, Riverwood" },
            { label: "Email", value: "emilyj@email.com" },
            { label: "Phone", value: "020 8876 5678" }
            ],
        
        appointmentDetails: [
            { label: "Booking Date", value: "20/09/2023" },
            { label: "Booking Time", value: "13:00" }
            ],
        
        motStatus: "Passed",
        
        vehicleIdentification: [
            { label: "V.I.N", value: "5PRHG07878E018203" },
            { label: "License Plate", value: "XYZ-7890" }
            ],
            
            vehicleDetails: [
            { label: "Year of Manufacture", value: 2019 },
            { label: "Manufacturer", value: "Honda" },
            { label: "Model", value: "Civic" },
            { label: "Derivative", value: "Civic LX" }, 
            { label: "Fuel Type", value: "Diesel" },
            { label: "Vehicle Category", value: "Car" },
            { label: "Vehicle Color", value: "Crimson Red" },
            { label: "Engine Size", value: "1.5L" },
            { label: "Drive Type", value: "All-Wheel Drive" },
            { label: "Body Type", value: "Coupe" },
            { label: "Number of Doors", value: 2 },
            { label: "Number of Seats", value: 4 }
            ],
            
            motTestDetails: [
            { label: "Test Result", value: "Pass" },
            { label: "Expiry Date", value: "20/09/2024" },
            { label: "Date of Test", value: "10/09/2023" },
            { label: "MOT Test Number", value: "MOT66778899" },
            { label: "Reasons for Failure", value: "" },
            { label: "Advisory Notes", value: "Tire pressure slightly low" },
            { label: "Inspector's Name", value: "John Miller" },
            { label: "Additional Work Notes", value: "Interior well-maintained" },
            ],
        
            testResultsAndAdvisories: [
            { label: "Categories of defects", value: "Minor" },
            { label: "Recommendations", value: "Safe for use" },
            { label: "Next Service Date", value: "25/05/2024" },
            { label: "Future Maintenance Tips", value: "Check brakes in 6 months" }
            ],
            
            emissionDetails: [
            { label: "CO2 Emissions", value: "95 g/km" },
            { label: "Emission Test Results", value: "Pass" }
            ],    
            
            inspectorsNotes: [
            { label: "Personal Observations", value: "Interior well-maintained" },
            { label: "Tester's Name and Signature", value: "John Miller" }
            ],
        
            additionalWorkDone: [
            { label: "Details", value: "Refilled coolant" }
            ],    
            
            costsAndBilling: [
            { label: "Test Cost", value: "$60" },
            { label: "Repair Costs", value: "$15 for coolant" },
            { label: "Total Bill", value: "$75" },
            { label: "Payment Status", value: "Paid" }
            ],    
            
            previousTestResults: [
            { label: "Historical Data", value: "Pass on 19/09/2022" },
            { label: "Retests", value: "No retests" }
            ]
        },

    {
        customerDetails: [
            { label: "Name", value: "Michael Brown" },
            { label: "Address", value: "789 Maple Drive, Sunnyside" },
            { label: "Email", value: "michaelb@email.com" },
            { label: "Phone", value: "020 3344 5566" }
            ],
        
        appointmentDetails: [
            { label: "Booking Date", value: "23/09/2023" },
            { label: "Booking Time", value: "15:30" }
            ],
        
        motStatus: "Failed",
        
        vehicleIdentification: [
            { label: "V.I.N", value: "6ADLW12345F098456" },
            { label: "License Plate", value: "ABCD-1234" }
            ],
            
            vehicleDetails: [
            { label: "Year of Manufacture", value: 2018 },
            { label: "Manufacturer", value: "Mazda" },
            { label: "Model", value: "CX-5" },
            { label: "Derivative", value: "CX-5 Sport" }, 
            { label: "Fuel Type", value: "Petrol" },
            { label: "Vehicle Category", value: "SUV" },
            { label: "Vehicle Color", value: "Pearl White" },
            { label: "Engine Size", value: "2.0L" },
            { label: "Drive Type", value: "Rear-Wheel Drive" },
            { label: "Body Type", value: "SUV" },
            { label: "Number of Doors", value: 4 },
            { label: "Number of Seats", value: 5 }
            ],
            
            motTestDetails: [
            { label: "Test Result", value: "Fail" },
            { label: "Expiry Date", value: "23/09/2024" },
            { label: "Date of Test", value: "13/09/2023" },
            { label: "MOT Test Number", value: "MOT88990011" },
            { label: "Reasons for Failure", value: "Worn tires" },
            { label: "Advisory Notes", value: "Change air filters" },
            { label: "Inspector's Name", value: "Sarah Green" },
            { label: "Additional Work Notes", value: "Exterior in pristine condition" },
            ],
            
            testResultsAndAdvisories: [
            { label: "Categories of defects", value: "Major" },
            { label: "Recommendations", value: "Replace tires" },
            { label: "Next Service Date", value: "30/06/2024" },
            { label: "Future Maintenance Tips", value: "Regular oil changes every 5000 miles" }
            ],

            emissionDetails: [
            { label: "CO2 Emissions", value: "120 g/km" },
            { label: "Emission Test Results", value: "Pass" }
            ],    

            inspectorsNotes: [
            { label: "Personal Observations", value: "Exterior in pristine condition" },
            { label: "Tester's Name and Signature", value: "Sarah Green" }
            ],
        
            additionalWorkDone: [
            { label: "Details", value: "Checked brake fluids" }
            ],    
            
            costsAndBilling: [
            { label: "Test Cost", value: "$70" },
            { label: "Repair Costs", value: "$80 for tires" },
            { label: "Total Bill", value: "$150" },
            { label: "Payment Status", value: "Pending" }
            ],    
            
            previousTestResults: [
            { label: "Historical Data", value: "Pass on 22/09/2022" },
            { label: "Retests", value: "No retests" }
            ]
        },
]