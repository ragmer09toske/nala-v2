import { Box, Card } from '@mui/material'
import axios from 'axios'
import { DMSearchBar } from 'components/SearchBar/DMSearch'
import React, { useEffect, useState } from 'react'
import URI_Server from 'uri'

export const Schedules = () => {
    const [load, setLoading] = useState(false)
    const [user, setUser] = useState(null);

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
      }, []);

  return (
    <Card sx={{
        position: 'fixed',
        top: 130,
        minWidth: "100vw",
        background: "White",
        border: "solid",
        borderTopColor: 'rgba(0, 0, 0, 0.022)',
        borderLeftColor: 'rgba(0, 0, 0, 0.022)',
        borderRightColor: 'rgba(0, 0, 0, 0.022)',
        borderRadius: "20px 20px 0 0",
        minHeight: "69.5vh"
    }}>
        <Box sx={{
        }}>
            <Box sx={{
                display: "flex",
                justifyContent:  "space-between",
                alignItems: "center",
                p: 2,
                mt: 5
            }}>
                <Box sx={{
                    mt: 2
                }}>
                    <h3>Milestones</h3>
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
                            width={35}
                        />
                </Box>
            </Box>
            <Box sx={{
                position: "relative",
                zIndex: 999,
                mt: -2
            }}>
                <DMSearchBar />
            </Box>
        </Box>
        {/* DMs */}
        <Box sx={{
            maxHeight: "55vh",
            overflow: "scroll",
            p:2,
            border: "solid",
            borderTopColor: '#e6e8ea',
            borderLeftColor: '#e6e8ea',
            borderBottomColor: '#e6e8ea',
            borderRightColor: '#e6e8ea',
            borderRadius: "20px 20px 0 0",
            borderWidth: 0.5,
            color: "rgba(0, 0, 0, 0.422)",
            fontSize: 14,
            background: "#f0f2f5",
            minHeight:"100vh",
        }}>
            
            {/* Content goes here */}
        </Box>
    </Card>
  )
}
