import { Box, Card, Divider } from '@mui/material'
import axios from 'axios'
import { DMSearchBar } from 'components/SearchBar/DMSearch'
import ProgressBarNala from 'layouts/pages/landing-pages/profile/ProgressBar'
import React, { useEffect, useState } from 'react'
import URI_Server from 'uri'
import { OnlineUsers } from './OnlineUsers'
import { useNavigate } from 'react-router-dom'

export const DMsPage = () => {
    const [load, setLoading] = useState(false)
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    const hadnleNavigate = () => {  
        navigate("/dms")
    }
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

  return (
    <Box>
        <Card
        sx={{
          width: "60%",
          position: "absolute",
          top: 170,
          ml: -1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
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
            >
            <img
                src={user?.avatar}
                style={{ borderRadius: 10 }}
                alt={user?.name}
                width={45}
            />
            </Box>
        </Card>
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
            
        </Card>
    </Box>
  )
}
