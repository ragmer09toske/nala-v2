import { Box, Divider } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import URI_Server from 'uri';

export const OnlineUsers = () => {
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
    <Box>
    <Box sx={{
        maxWidth: "90vw",
        display: "flex",
        gap: 2,
        overflow: "scroll"
    }}>
        <Box >
            <img
                src={user?.avatar}
                style={{ borderRadius: 10 }}
                alt={user?.name}
                width={40}
            />
        </Box>
        <Box >
            <img
                src={user?.avatar}
                style={{ borderRadius: 10 }}
                alt={user?.name}
                width={40}
            />
        </Box>
        <Box >
            <img
                src={user?.avatar}
                style={{ borderRadius: 10 }}
                alt={user?.name}
                width={40}
            />
        </Box>
        <Box >
            <img
                src={user?.avatar}
                style={{ borderRadius: 10 }}
                alt={user?.name}
                width={40}
            />
        </Box>
        <Box >
            <img
                src={user?.avatar}
                style={{ borderRadius: 10 }}
                alt={user?.name}
                width={40}
            />
        </Box>
        <Box >
            <img
                src={user?.avatar}
                style={{ borderRadius: 10 }}
                alt={user?.name}
                width={40}
            />
        </Box>
        <Box >
            <img
                src={user?.avatar}
                style={{ borderRadius: 10 }}
                alt={user?.name}
                width={40}
            />
        </Box>
        <Box >
            <img
                src={user?.avatar}
                style={{ borderRadius: 10 }}
                alt={user?.name}
                width={40}
            />
        </Box>
        <Box >
            <img
                src={user?.avatar}
                style={{ borderRadius: 10 }}
                alt={user?.name}
                width={40}
            />
        </Box>
        <Box >
            <img
                src={user?.avatar}
                style={{ borderRadius: 10 }}
                alt={user?.name}
                width={40}
            />
        </Box>
        <Box >
            <img
                src={user?.avatar}
                style={{ borderRadius: 10 }}
                alt={user?.name}
                width={40}
            />
        </Box>
    </Box>
    <Divider sx={{background: "gray"}} />
    </Box>
  )
}
