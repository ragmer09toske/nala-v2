import { Box, Typography } from "@mui/material";
import Nucleus_logo from "../../assets/images/one.png";
import Hiring from "../../assets/images/hire.png";
import Looking from "../../assets/images/looking.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [individual, setIndividual] = useState()
  const [business, setBusiness] = useState()
  const [onRadio, setOnRadio] = useState()
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/login")
  }
  const handleIndivisual = () =>{
    setIndividual(true)
    setBusiness(false)
    localStorage.removeItem("occupation")
    localStorage.setItem("occupation","Indivisual")
    setOnRadio("Join as a Individual")
  }
  const handleBusiness = () =>{
    setBusiness(true)
    setIndividual(false)
    localStorage.removeItem("occupation")
    localStorage.setItem("occupation","Business")
    setOnRadio("Join as an Business")
  }
  const handleCreateAccount = () => {
    navigate("/user")
  }
  return (
    <Box sx={{
      p: {xs: 2},
      pt:6, 
      background: "white"
    }}>
      <img src={Nucleus_logo} alt='nala logo' width={65} ></img>
      <br/>
      <br/>
      <Box sx={{
        border: 'solid',
        borderColor: "rgba(0, 0, 0, 0.278)",
        minHeight: '40vh',
        borderRadius: 1,
        p: 2.5,
      }}>
        <Box sx={{
           display: "flex",
           justifyContent: "center",
        }}>
          <Typography
            sx={{
              fontSize: 25,
              fontWeight: 600
            }}
          >
            <span className="Playfair">Join as an Individual</span>
          </Typography>
        </Box>
        <Box sx={{
          border: 'solid',
          borderColor: !individual ? "rgba(0, 0, 0, 0.278)" : "#00c500",
          borderWidth: !individual ? 1 : 3,
          height: 200,
          borderRadius: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
          onClick={handleIndivisual}
        >
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <img src={Hiring} width="auto" height="65px" alt="nala hiring" ></img>
            <Box sx={{
              width: "40px",
              height: "40px",
              border: "solid",
              borderColor: !individual ? "rgba(0, 0,  0, 0.278)" : "#00c500",
              borderWidth: !individual ? 1 : 5,
              borderRadius: "50%",
              p:1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              }}>
              <Box sx={{
                width: !individual ? "20px" : "14px",
                height: !individual ? "20px" : "14px",
                border: "solid",
                borderColor: !individual ? "rgba(0, 0,  0, 0.278)" : "#00c500",
                background: individual && "#00c500",
                borderRadius: "50%"
              }}>
              </Box>
            </Box>
          </Box>
          <Typography>
          <span className="ubuntu">I'm an individual looking for a job</span>
          </Typography>
        </Box>
        <br/>
        <Box sx={{
           display: "flex",
           justifyContent: "center",
        }}>
          <Typography
            sx={{
              fontSize: 25,
              fontWeight: 600
            }}
          >
            <span className="Playfair">Join as a Business</span>
          </Typography>
        </Box>
          <Box sx={{
          border: 'solid',
          borderColor: !business ? "rgba(0, 0, 0, 0.278)" : "#00c500",
          borderWidth: !business ? 1 : 3,
          height: 200,
          borderRadius: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
        onClick={handleBusiness}
        >
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <img src={Looking} width="auto" height="65px" alt="nala hiring" ></img>
            <Box sx={{
              width: "40px",
              height: "40px",
              border: "solid",
              borderColor: !business ? "rgba(0, 0,  0, 0.278)" : "#00c500",
              borderWidth: !business ? 1 : 5,
              borderRadius: "50%",
              p:1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              }}>
              <Box sx={{
                width: !business ? "20px" : "14px",
                height: !business ? "20px" : "14px",
                border: "solid",
                borderColor: !business ? "rgba(0, 0,  0, 0.278)" : "#00c500",
                background: business && "#00c500",
                borderRadius: "50%"
              }}>
              </Box>
            </Box>
          </Box>
          <Typography>
            <span className="ubuntu">I'm a Business looking for people to hire</span>
          </Typography>
        </Box>
        <br/>
        <Box sx={{
          background: onRadio ? "#00c500" : "lightgray",
          p: 0.9,
          display: "flex",
          justifyContent: "center",
          borderRadius: "30px",
          alignItems: "center",
        }}
        onClick= {handleCreateAccount}
        >
          <Typography 
          sx={{
            color: onRadio ? "#fff" : "rgba(0, 0, 0, 0.278)",
          }}
          >
            {onRadio ? onRadio : "Create Account"}
          </Typography>
        </Box>
        <br/>
          <Typography sx={{
            display: "flex",
            justifyContent: "center"
          }}>
            <p>Already have an account?<span onClick={handleLogin} style={{color:"#00c500"}}> Log in</span></p>
          </Typography>
        </Box>
    </Box>
  );
}

export default RegistrationForm;