// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "components/Material-kit/MKBox";
import MKTypography from "components/Material-kit/MKTypography";
import MKButton from "components/Material-kit/MKButton";
import { Box, TextField, Typography } from "@mui/material";
import { PersonOutlined } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import SmallerLoadSpinner from "assets/theme/components/LoadSpiner";
import URI_Server from "uri";

function GetUser({toPassword,setEmail, email}) {
  const [error,setError] = useState()
  const [loading, setLoading] = useState()

  const handleContinue = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://${URI_Server}/nala/auth/verifyEmail`,
        {
          email: email,
        }
      );
      // Handle the response data as needed
      setLoading(false)
      toPassword(true)
      console.log("Response data:", response.data);
      
    } catch (error) {
      // Handle errors, either by logging them or providing user feedbackset
      setLoading(false)
      setError("email not found")
      console.error("Error occurred:", error);
    }
  };

  return (
    <>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundColoR: "white",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
                <br/>
                <Typography sx={{fontSize: "30px", fontWeight: 900, display: "flex", justifyContent: "center"}}>
                    <span className='ubuntu'>Login</span>
                </Typography>
              <MKBox pt={4} pb={3} px={3}>
                <form>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                  <Box sx={{
                    position: "relative"
                }}>
                    <TextField 
                        placeholder='Email' 
                        type="email"
                        for="email"
                        fullWidth
                        required
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Box sx={{
                        position: "absolute",
                        top: 4.2,   
                        right: 10

                        }}>
                        <PersonOutlined />
                    </Box>
                </Box>
                  </MKBox>
                  <Box sx={{fontSize: 10, display: 'flex', justifyContent: "center", color:"red"}}>
                    {error && error}
                  </Box>
                  <MKBox mt={4} mb={1}>
                    {!loading ?
                    (<MKButton onClick={handleContinue} for="submit" type="submit" variant="gradient" color="info" fullWidth>
                      Continue with Email
                    </MKButton>)
                    :
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                      <SmallerLoadSpinner />
                    </Box>
                    }
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/register"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign Up
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
                </form>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default GetUser;
