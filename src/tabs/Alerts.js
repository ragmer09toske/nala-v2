import { Box} from '@mui/material';
import SmallerLoadSpinner from 'assets/theme/components/LoadSpiner';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import URI_Server from 'uri';
import { ActivityBar } from './Activity/ActivityBar';

export const Alerts = () => {
  const [user, setUser] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [load, setLoading] = useState(false)
  const [View, setView] = useState()
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
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100); // 100 milliseconds delay
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Box sx={{
      mt: 20,
      position: "relative"
    }}>
      <Box sx={{
        position: "fixed",
        top: 70,
        minWidth: "100vw",
        zIndex: 999
      }}>
        <ActivityBar setView={setView}/>
      </Box>
      <Box sx={{
        p: 1
      }}>
        {View}
      </Box>
    </Box>
  )
}
