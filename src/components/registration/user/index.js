import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Nucleus_logo from "../../../assets/images/one.png";
import { NuRadio } from "../nala-radio";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingModal from "components/loadingModel/LoadingModels";
import URI_Server from "uri";

export const User = () => {
  const [emailsAllowed, setEmailsAllowed] = useState(false);
  const [seePassword, setSeePassword] = useState(true);
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [createName, setCreateName] = useState();
  const [createEmail, setCreateEmail] = useState();
  const [createNumber, setCreateNumber] = useState();
  const [createDistrict, setCreateDistrict] = useState();
  const [createReponse, setCreateReponse] = useState();
  const [loading,setLoading] = useState()
  const [isOpen,setIsOpen] = useState(true)
  const navigate = useNavigate()
  const handleEmailsAllowed = () => {
    setEmailsAllowed(!emailsAllowed);
  };
  const handlePasswordVisibility = () => {
    setSeePassword(!seePassword);
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Validate the password
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasCharacter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    if (newPassword.length >= 8 && hasUpperCase && hasCharacter && hasNumber) {
      setErrorText("");
    } else {
      setErrorText(
        "Password must be at least 8 characters long, include 1 uppercase letter, 1 character, and 1 number."
      );
    }
  };

  const toLogin = () => {
    navigate("/login")
  }

  const handleCreateRequest = async (e) => {
    setLoading(true)
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const newUser = {
      name: createName,
      email: createEmail,
      password: password,
      number: createNumber,
      district: createDistrict,
      account_type: localStorage.getItem("occupation"),
    };

    try {
      const response = await axios.post(
        `https://${URI_Server}/nala/auth/register`,
        newUser,
        config
      );
      console.log(response.data);
      setCreateReponse("account created")
      setLoading(false)
      navigate("/login")
    } catch (error) {
      console.log(error.message);
      setCreateReponse("error creating account")
      setLoading(false)
  }
  };

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      {loading && <LoadingModal isOpen={isOpen}/>}
      <img src={Nucleus_logo} alt="nala logo" width={65}></img>
      <br />
      <br />
      <Box
        sx={{
          pl: "5%",
          pr: "5%",
        }}
      >
        <Box
          sx={{
            border: "solid",
            borderColor: "rgba(0, 0, 0, 0.278)",
            minHeight: "40vh",
            borderRadius: 1,
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span className="Playfair">Welcome on board</span>
          </Typography>
          <TextField handleCreateAccount
            placeholder="Names" 
            type="text" 
            fullWidth 
            onChange={(e)=>setCreateName(e.target.value)}
          />
          <TextField 
            placeholder="Email" 
            type="email" 
            fullWidth 
            onChange={(e)=>setCreateEmail(e.target.value)}
          />
          <TextField 
            placeholder="Phone" 
            type="number" 
            fullWidth 
            onChange={(e)=>setCreateNumber(e.target.value)}
          />
          <Box
            sx={{
              position: "relative",
            }}
          >
            <TextField
              placeholder="Password (8 or more characters)"
              type={seePassword ? "password" : "text"}
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              error={!!errorText}
              helperText={errorText}
            />
            <Box
              sx={{
                position: "absolute",
                top: 4.2,
                right: 10,
              }}
            >
              {seePassword ? (
                <VisibilityOffIcon onClick={handlePasswordVisibility} />
              ) : (
                <VisibilityIcon onClick={handlePasswordVisibility} />
              )}
            </Box>
          </Box>
          <TextField 
            placeholder="Maseru" 
            fullWidth 
            onChange={(e)=>setCreateDistrict(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
            onClick={handleEmailsAllowed}
          >
            <NuRadio radio={emailsAllowed} />
            <Typography
              sx={{
                fontSize: "13px",
              }}
            >
              <span className="ubuntu">
                send me job-seeking emails with valuable tips and leads, please!
              </span>
            </Typography>
          </Box>
          <Box sx={{fontSize: 10, display: 'flex', justifyContent: "center", color:"red"}}>
            {createReponse && createReponse}
          </Box>
          <Box
            sx={{
              background: "#00c500",
              p: 0.9,
              display: "flex",
              justifyContent: "center",
              borderRadius: "30px",
              alignItems: "center",
            }}
            onClick= {handleCreateRequest}
          >
            <Typography
              sx={{
                color: "#fff",
              }}
            >
              Create Account
            </Typography>
          </Box>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            <p className="ubuntu">
              Already have an account?
              <span onClick={toLogin} style={{ color: "#00c500" }}> Log in</span>
            </p>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
