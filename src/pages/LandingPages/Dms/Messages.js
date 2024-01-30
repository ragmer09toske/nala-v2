import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import URI_Server from 'uri';
import { Timeframe } from './Timeframe';

export const Messages = () => {
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

    }, [])
  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%', // Set the height to 100% of the parent container
            marginTop: 'auto',// Push the box to the bottom of the parent container
            mb: 10
        }}
        >
        <Box
            sx={{
            borderRadius: 5,
            p: 2
            }}
        >
            <img
            src={user?.avatar}
            style={{ borderRadius: 10 }}
            alt={user?.name}
            width={45}
            />
        </Box>
        <Timeframe />
    </Box>
)
}
