import { Box, Card } from '@mui/material';
import SmallerLoadSpinner from 'assets/theme/components/LoadSpiner';
import axios from 'axios';
import { Ads } from 'components/Ads';
import { SearchBar } from 'components/SearchBar/SearchBar';
import React, { useEffect, useState } from 'react'
import URI_Server from 'uri';

export const Internships = () => {
  const [user, setUser] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [load, setLoading] = useState(false)

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
    <Box>
     {
        !load ?
      (<Card
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
      </Card>)
      :
      
      (
        <Box sx={{
          width: "60%",
          position: "absolute",
          top: 170,
          ml: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "center",
        }}>
          <SmallerLoadSpinner />
        </Box>
      )
      } 

      <Box  
        sx={{
          width: "100%",
          position: "absolute",
          top: 250,
        }}
      >
        <Box sx={{
          position: "relative",
          zIndex: 999,
        }}>
          <SearchBar />
        </Box>
        <Box
          sx={{
            p: "5px 15px 5px 15px",
          }}
        >
          <h4 className="ubuntu">Make your dream career a reality</h4>
          <Box sx={{
            position: "absolute",
            top: -10,
            right: "20%",
          }}>
            <svg width="300" height="150">
              {/* Add the className to the SVG path */}
              <path 
                className={animate ? 'animate-path' : ''}
                d="M 10 140 Q 150 100 290 140" 
                stroke="#87CEFA" 
                strokeWidth="5" 
                fill="none" 
              />
            </svg>
          </Box>

          <Box sx={{
            pt:2,
          }}>
           {/* Content should be bellow */}
           <Ads />
           <Ads />
           <Ads />
           <Ads />
           {/* Vacuum */}
           <Box sx={{
            minHeight: "10vh"
           }}></Box>
          </Box>

          
        </Box>
      </Box>
    </Box>
  )
}
