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
        <Box sx={{
            p: 2,
        }}>
        <Box
        sx={{
            borderRadius: 5,
            width: 70, // Set the desired width
            height: 70, // Set the desired height
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden', // Ensure that any part of the image exceeding the container is hidden
        }}
        >
        <img
            src={user?.avatar}
            alt={user?.name}
            style={{
            borderRadius: 5,
            width: '100%', // Ensure that the image takes up the entire container
            height: '100%', // Ensure that the image takes up the entire container
            objectFit: 'cover', // Maintain the aspect ratio without distortion
            }}
        />
        </Box>
        <h4>{user?.name}::</h4>   
        <p style={{
            fontSize: 15
        }}>
            This area is designated for your use. You can create draft messages, organize your to-do list, store links and files, and even engage in a personal conversation with yourself. Please note that if you choose to have a conversation, you'll be responsible for generating content for both sides of the dialogue.
        </p>
        </Box>
    </Box>
)
}
