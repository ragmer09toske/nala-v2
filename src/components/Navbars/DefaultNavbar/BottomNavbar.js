import {  HomeOutlined,  NotificationsOutlined,  SendOutlined, WorkOutlineOutlined } from '@mui/icons-material';
import { FiSend } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi"
import { Box } from '@mui/material';
import React, { useState } from 'react';

export const BottomNavbar = ({setView, HomeActive, setHomeActive, JobsActive, setJobsActive, AlertsActive, setAlertsActive, InternshipsActive, setInternshipsActive}) => {
  const navbarStyle = {
    position: 'fixed',            // This will fix the navbar at the bottom
    width: '100%',                // Take full width of the viewport
    bottom: 0,                    // Place it at the bottom
    backgroundColor: '#f9f9f9',   // Example background color
    borderTop: 'none',            // Remove the border at the top
    boxShadow: '0px 4px 8px rgba(10, 10, 10, 0.6)', // Add shadow at the top
    padding: '5px 0 0 0',            // Example padding
    textAlign: 'center',          // Center align the content
    zIndex: 1000,                 // Ensure it stays above other content
    fontSize: "22px",
    overflow: "hidden"
  };
  const active = {
    width: '100%',
    height: '20px',
    backgroundColor: "#1a73e8",
    mt: -2.5,
    borderRadius: 30
  }
  const handleInternshipsClick = () => {
    setInternshipsActive(true)
    setHomeActive(false)
    setJobsActive(false)
    setAlertsActive(false)
    setView("Internships")
  }
  const handleHomeClick = () => {
    setInternshipsActive(false)
    setHomeActive(true)
    setJobsActive(false)
    setAlertsActive(false)
    setView("Home_Personilzed")
  }
  const handleJobsClick = () => {
    setInternshipsActive(false)
    setHomeActive(false)
    setJobsActive(true)
    setAlertsActive(false)
    setView("home")
  }
  const handleAlertsClick = () => {
    setInternshipsActive(false)
    setHomeActive(false)
    setJobsActive(false)
    setAlertsActive(true)
    setView("Alerts")
  }
  return (
    <div style={navbarStyle}>
        <Box sx={{
            display: "flex",
            justifyContent: "space-around",
        }}>
            <Box sx={HomeActive ?
                    ({color: "#1a73e8"})
                    :
                    ({color: "rgba(0, 0, 0, 0.679)"})
                }
                onClick={handleHomeClick}
                >
                {HomeActive && (<Box sx={active}></Box>)}
                <HiOutlineHome />
                <p style={{ fontSize: "10px" }}><b>Home</b></p>
            </Box>
            <Box sx={InternshipsActive ?
                    ({color: "#1a73e8"})
                    :
                    ({color: "rgba(0, 0, 0, 0.679)"})
                }
                onClick={handleInternshipsClick}
                >
                {InternshipsActive && (<Box sx={active}></Box>)}
                <FiSend/>
                <p style={{ fontSize: "10px" }}><b>Internships</b></p>
            </Box>
            <Box sx={JobsActive ?
                    ({color: "#1a73e8"})
                    :
                    ({color: "rgba(0, 0, 0, 0.679)"})
                }
                onClick={handleJobsClick}
                >
                {JobsActive && (<Box sx={active}></Box>)}
                <WorkOutlineOutlined/>
                <p style={{ fontSize: "10px"}}><b>Jobs</b></p>
            </Box>
            <Box sx={AlertsActive ?
                    ({color: "#1a73e8"})
                    :
                    ({color: "rgba(0, 0, 0, 0.679)"})
                }
                onClick={handleAlertsClick}
                >
                {AlertsActive && (<Box sx={active}></Box>)}
                <NotificationsOutlined/>
                <p style={{ fontSize: "10px" }}><b>Alerts</b></p>
            </Box>
        </Box>
    </div>
  );
};
