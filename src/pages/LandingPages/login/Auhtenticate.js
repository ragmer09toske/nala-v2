import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

import MKBox from "components/Material-kit/MKBox";
import MKTypography from "components/Material-kit/MKTypography";
import MKButton from "components/Material-kit/MKButton";
import { Box, TextField, Typography } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import LoadingModal from "components/loadingModel/LoadingModels";
import SmallerLoadSpinner from "assets/theme/components/LoadSpiner";
import URI_Server from "uri";

function Authenticate({email}) {
  const [rememberMe, setRememberMe] = useState(false);
  const [seePassword, setSeePassword] = useState(true)

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handlePasswordVisibility = () => {
    setSeePassword(!seePassword)
  }
 
  const [loading, setLoading] = useState();
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(
        `https://${URI_Server}/nala/auth/login`,
        {
          email: email,
          password: password,
        }
      );
      localStorage.removeItem("AuthToken"); // Successful login
      localStorage.removeItem("user_id"); // Successful login
      localStorage.setItem("user_id",response.data.userID); // Successful login
      localStorage.setItem("AuthToken",response.data.token); // Successful login
      // You can show a success message to the user here
      // You might want to redirect them to a new page as well
      setLoading(false)
      navigate("/")
      window.location.reload()
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 401) {
          console.log("Invalid email or password");
          setLoginError("Invalid email or password");
          setLoading(false)
        } else if (error.response.status === 403) {
          console.log("Token expired or invalid");
        } else {
          console.log("An unknown error occurred");
          setLoading(false)
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Request error: No response received from the server");
          setLoginError("Invalid email or password");
          setLoading(false)
        } else {
        // Something happened in setting up the request that triggered an error
        console.log("Request setup error:", error.message);
        setLoginError("Invalid email or password");
        setLoading(false)
      }
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
                    <span className='ubuntu'>Welcome</span>
                </Typography>
                <Typography sx={{fontSize: "15px", fontWeight: 900, display: "flex", justifyContent: "center"}}>
                    <span className='ubuntu'>{email}</span>
                </Typography>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <Box sx={{
                        position: "relative"
                        }}>
                        
                        <TextField 
                        placeholder='Password' 
                        type={seePassword ? "password" : "text"} 
                        fullWidth
                        for="password"
                        error={loginError}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <Box sx={{
                        position: "absolute",
                        top: 4.2,   
                        right: 10
                        }}>
                        {seePassword ? <VisibilityOffIcon onClick={handlePasswordVisibility}/> : <VisibilityIcon onClick={handlePasswordVisibility}/>}
                        </Box>
                        <TextField 
                          placeholder='Password' 
                          type="email" 
                          for="email"
                          value={email}
                          fullWidth
                          error={loginError}
                          style={{visibility: "hidden"}}
                        />
                    </Box>
                  </MKBox>
                  <Box sx={{fontSize: 10, display: 'flex', justifyContent: "center", color:"red", marginTop: -6}}>
                    {loginError && loginError}
                  </Box>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                  <Switch checked={rememberMe} onChange={handleSetRememberMe}  />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                  {!loading ?
                    (<MKButton onClick={handleLogin} for="submit" type="submit" variant="gradient" color="info" fullWidth>
                      login
                    </MKButton>)
                    :
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                      <SmallerLoadSpinner />
                    </Box>
                    }
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Forgot password?{" "}
                      <MKTypography
                        component={Link}
                        // to="/register"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Yes!
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default Authenticate;
