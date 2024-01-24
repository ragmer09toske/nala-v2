import { Box, Card, TextField } from '@mui/material'
import axios from 'axios'
import ProgressBarNala from 'layouts/pages/landing-pages/profile/ProgressBar'
import React, { useEffect, useState } from 'react'
import URI_Server from 'uri'
import { useNavigate } from 'react-router-dom'
import { ArrowBack, Mic } from '@mui/icons-material'

export const DMsPage = () => {
    const [load, setLoading] = useState(false)
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    const fetchCurrentUser = async () => {
        setLoading(true)
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          },
        };
    
        try {
          const response = await axios.get(
            `https://${URI_Server}/nala/users/${localStorage.getItem("user_id")}`,
            config
          );
    
          // 2. Update the user state instead of assigning to the variable
          setUser(response.data);
          console.log(response.data); // Log the user data for debugging
          setLoading(false)
        } catch (e) {
          console.log(e.message);
          setLoading(false)
        }
    };
    
    useEffect(() => {
    // Fetch the current user when the component mounts
    fetchCurrentUser();
    
    }, [])
    const goBack = () => {
        window.history.back();
    };
    
    const toProfile = () => {
        navigate("/profile")
    }
  return (
    <Box>
        <Box sx={{
            mt: 2,
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "center",
            p: 2
        }}>
            <Box sx={{
                background: "white",
                p: 2,
                width: 50,
                height: 50,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
                onClick={goBack}
            >
                <ArrowBack />
            </Box>
            <Card
                sx={{
                width: "60%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "center",
                }}
            >
                <Box sx={{
                    background: "#00c500",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    position: "absolute",
                    right: 35,
                    top: 43 ,
                }}></Box>  
                <Box
                sx={{
                    pl: 3,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    mt: 2,
                    justifyContent: "center",
                }}
                >
                <p style={{ fontSize: 15, color: "#1a73e8" }}>
                    <b>{user?.name}</b>
                </p>
                </Box>
                <Box
                    sx={{
                        borderRadius: 5,
                    }}
                    onClick={toProfile}
                >
                    <img
                        src={user?.avatar}
                        style={{ borderRadius: 10 }}
                        alt={user?.name}
                        width={45}
                    />
                </Box>
            </Card>
        </Box>
        <Card sx={{
            position: 'fixed',
            top: 120,
            minWidth: "100vw",
            background: "White",
            border: "solid",
            borderTopColor: 'rgba(0, 0, 0, 0.022)',
            borderLeftColor: 'rgba(0, 0, 0, 0.022)',
            borderRightColor: 'rgba(0, 0, 0, 0.022)',
            borderRadius: "20px 20px 0 0",
            minHeight: "79vh"
        }}>
            <Box sx={{
            position: 'fixed',
            bottom: 0,
            minWidth: "100vw",
            background: "White",
            border: "solid",
            borderTopColor: 'rgba(0, 0, 0, 0.22)',
            borderLeftColor: 'rgba(0, 0, 0, 0.22)',
            borderRightColor: 'rgba(0, 0, 0, 0.22)',
            borderRadius: "20px 20px 0 0",
            minHeight: "10vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: 'center',
            color: "rgba(0, 0, 0, 0.22)",
            p:2
            }}>
                <Box sx={{
                    background: "#f0f2f5",
                    p: 2,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                    onClick={goBack}
                >
                    <ArrowBack />
                </Box>
                <Box sx={{
                    width: "70%"
                }}>
                    <TextField
                        size="small"
                        fullWidth
                        label="Message..."
                        variant="outlined"
                        placeholder="Message"
                        InputProps={{
                        style: {
                            color: "rgba(0, 0, 0, 0)',", // Text color
                        },
                    }}
                    />
                </Box>
                <Box sx={{
                    background: "#f0f2f5",
                    p: 2,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                    onClick={goBack}
                >
                    <Mic />
                </Box>
            </Box>
        </Card>
    </Box>
  )
}
