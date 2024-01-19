/* eslint-disable react/jsx-pascal-case */
import { Box } from "@mui/material";
import MKBox from "components/Material-kit/MKBox";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import { SearchBar } from "components/SearchBar/SearchBar";
import React, { useEffect, useState } from "react";
import routes from "routes";
import { Feed } from "components/feed/Feed";
import SignInBasic from "pages/LandingPages/login";
import { useNavigate } from "react-router-dom";
import { BottomNavbar } from "components/Navbars/DefaultNavbar/BottomNavbar";
import { Home_Persona } from "tabs/Home_Persona";
import { Internships } from "tabs/Internships";
import { Alerts } from "tabs/Alerts";

export const Presentation = () => {
  const [HomeActive, setHomeActive] = useState()
  const [JobsActive, setJobsActive] = useState(true)
  const [AlertsActive, setAlertsActive] = useState()
  const [InternshipsActive, setInternshipsActive] = useState()
  const [view, setView] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("AuthToken")) {
      setView("home");
    } else {
      navigate("/welcome")
    }
  }, []);

  let content;
  switch (view) {
    case "home":
      content = (
        <>
          <DefaultNavbar routes={routes} dark sticky />
          <MKBox
            minHeight="75vh"
            width="100%"
            sx={{
              mt: -19,
              backgroundSize: "cover",
              backgroundPosition: "top",
              display: "grid",
              placeItems: "center",
              borderWidth: 1,
              borderColor: "black",
            }}
          >
            <Box
              width={"100%"}
            >
              <SearchBar />
            </Box>
          </MKBox>
          <Feed />
          <BottomNavbar 
            setView={setView} 
            HomeActive = {HomeActive} 
            setHomeActive={setHomeActive} 
            JobsActive={JobsActive} 
            setJobsActive={setJobsActive}
            AlertsActive = {AlertsActive}
            setAlertsActive = {setAlertsActive}
            InternshipsActive = {InternshipsActive}
            setInternshipsActive = {setInternshipsActive}
          />
        </>
      );
      break;

    case "login":
      content = <SignInBasic />;
      break;
    case "Home_Personilzed":
      // eslint-disable-next-line react/jsx-pascal-case
      content = (
        <>
          <DefaultNavbar routes={routes} dark sticky />
          {/* <MKBox
            minHeight="75vh"
            width="100%"
            sx={{
              mt: -19,
              backgroundSize: "cover",
              backgroundPosition: "top",
              display: "grid",
              placeItems: "center",
              borderWidth: 1,
              borderColor: "black",
            }}
          > */}
            <Box
              width={"100%"}
            >
              <Home_Persona />
            </Box>
          {/* </MKBox> */}
          <BottomNavbar 
            setView={setView} 
            HomeActive = {HomeActive} 
            setHomeActive={setHomeActive} 
            JobsActive={JobsActive} 
            setJobsActive={setJobsActive}
            AlertsActive = {AlertsActive}
            setAlertsActive = {setAlertsActive}
            InternshipsActive = {InternshipsActive}
            setInternshipsActive = {setInternshipsActive}
          />
        </>
      );
      break;
      case "Internships":
        content = (
        <>
          <DefaultNavbar routes={routes} dark sticky />
          <MKBox
            minHeight="75vh"
            width="100%"
            sx={{
              mt: -19,
              backgroundSize: "cover",
              backgroundPosition: "top",
              display: "grid",
              placeItems: "center",
              borderWidth: 1,
              borderColor: "black",
            }}
          >
            <Box
              width={"100%"}
            >
              <Internships />
            </Box>
          </MKBox>
          <BottomNavbar 
              setView={setView} 
              HomeActive = {HomeActive} 
              setHomeActive={setHomeActive} 
              JobsActive={JobsActive} 
              setJobsActive={setJobsActive}
              AlertsActive = {AlertsActive}
              setAlertsActive = {setAlertsActive}
              InternshipsActive = {InternshipsActive}
              setInternshipsActive = {setInternshipsActive}
            />
          </>
        );
        break;
        case "Alerts":
        content = (
        <>
          <DefaultNavbar routes={routes} dark sticky />
            <Box
              width={"100%"}
            >
              <Alerts />
            </Box>
          <BottomNavbar 
              setView={setView} 
              HomeActive = {HomeActive} 
              setHomeActive={setHomeActive} 
              JobsActive={JobsActive} 
              setJobsActive={setJobsActive}
              AlertsActive = {AlertsActive}
              setAlertsActive = {setAlertsActive}
              InternshipsActive = {InternshipsActive}
              setInternshipsActive = {setInternshipsActive}
            />
          </>
        );
        break;
    default:
      // Jobs
      content = (
        <>
          <DefaultNavbar routes={routes} dark sticky />
          <MKBox
            minHeight="75vh"
            width="100%"
            sx={{
              mt: -19,
              backgroundSize: "cover",
              backgroundPosition: "top",
              display: "grid",
              placeItems: "center",
              borderWidth: 1,
              borderColor: "black",
            }}
          >
            <Box sx={{display: "flex",gap: 3}}>
              <SearchBar />
            </Box>
          </MKBox>
          <Feed />
          <BottomNavbar />
        </>
      );
  }
  return content;
};
