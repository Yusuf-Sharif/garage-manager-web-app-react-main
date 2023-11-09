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

import { useState, useContext } from "react";

// react-router-dom components
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import useSignIn from "./hooks/useSignIn.js";

// Importing user authentication from context
import { AuthContext } from "../../../AuthContext/AuthContext.js"

function Basic() {

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [errorMsg, setErrorMsg] = useState(searchParams.get("error") || null)
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: ""
  })

  const { currentUser } = useContext(AuthContext)
  const { signIn } = useSignIn()

  function onChange(event) {
     const { name, value } = event.target;

    setFormDetails((prevForm) => {
      return {
        ...prevForm,
        [name]: value
      }
    })
  }
  
    if (currentUser) {
      navigate("/dashboard")
    }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput 
                type="email" 
                label="Email" 
                name="email" 
                value={formDetails.email}
                onChange={onChange}
                fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                type="password" 
                label="Password" 
                name="password"
                value={formDetails.password}
                onChange={onChange}
                fullWidth />
            </MDBox>
            
            { errorMsg && <p style={{
              fontSize: "14px", 
              color: "red",
              textTransform: "capitalize",
              }}
            >
              {errorMsg}
            </p> }

            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton 
                variant="gradient" 
                color="info" 
                fullWidth
                onClick={async () => {
                  // If theres a sign-in error, store the error message in errorMsg
                  const errorMsg = await signIn(formDetails.email, formDetails.password)
                  if (errorMsg) {
                    // Pass error message to state and re-render component to display error message
                    setErrorMsg(errorMsg)
                  }
                }}
              >
                sign in
              </MDButton>
              {/* For demonstration purposes */}
              <MDButton 
                sx={{marginTop: "20px"}}
                fullWidth
                onClick={() => signIn("guest@gmail.com", "123456")}
                color="success"
                size="large"
                variant="gradient"
              >
                Skip login
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
