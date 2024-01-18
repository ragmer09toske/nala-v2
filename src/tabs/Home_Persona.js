import { Box, Card } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import URI_Server from "uri";
import OH from "../assets/images/oh.png";
import { Height } from "@mui/icons-material";
import { SearchBar } from "components/SearchBar/SearchBar";
import wrokingme from "../assets/images/workme.png"
import SmallerLoadSpinner from "assets/theme/components/LoadSpiner";
import { Trending } from "components/Trending";
import { Ads } from "components/Ads";
export const Home_Persona = () => {

  // 1. Use useState to manage user state
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
    <Box
      sx={{
        // p: 3,
        backgroundColor: "#1a73e8",
        height: 200,
        borderRadius: "0 0 100px 0px",
        backgroundImage: "conic-gradient(from 315deg, #1A74E8, #FFFFFF)",
      }}
    >
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

      (<p></p>)
      }
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: 250,
        }}
      >
        <SearchBar />
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
            mt: 5,
            overflow: "scroll",
            p:1
          }}> 
          <Box sx={{

            display: "flex",
            minWidth: "200vw",
            gap: 5,
          }}> 
            <Box
              style={{
                background: "linear-gradient(to right, #87CEFA, white)",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h1
                style={{
                  color: "black",
                  fontSize: "36px",
                  fontWeight: "bold",
                  margin: "0",
                }}
              >
                Internships
              </h1>
              <h2 style={{ color: "black", fontSize: "22px", margin: "0" }}>
                Boost your career from the go
              </h2>
              <Box sx={{
                position: "fixed",
                // top: 170,
                bottom: 70,
                right: 5
              }}>
                <img src={wrokingme}  width={170} alt=""/>
              </Box>
              <button
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                <b>Know more</b>
              </button>
            </Box>

            <div
              style={{
                background: "linear-gradient(to right, #87CEFA, white)",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h1
                style={{
                  color: "black",
                  fontSize: "36px",
                  fontWeight: "bold",
                  margin: "0",
                }}
              >
                Jobs
              </h1>
              <h2 style={{ color: "black", fontSize: "22px", margin: "0" }}>
                Mosotho should never stay at home
              </h2>
              <button
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                <b>Know more</b>
              </button>
            </div>
          </Box>
          </Box>
          <Box sx={{
            pt:2,
          }}>
            <h2 style={{color: "#4CAF50"}} className="ubuntu">Trending on Nala</h2>
            <Box className="trends-catogries">
              <Box className="trends-vectors">
                <Box className="box-category"></Box>
                <Box className="line-category"></Box>
              </Box>
              <Box sx={{
                ml:2
              }}>
                <h4>Popular Categories</h4>
                <Trending />
              </Box>
            </Box>
           {/* Content should be bellow */}
           <Ads />
           {/* Vacuum */}
           <Box sx={{
            minHeight: "10vh"
           }}></Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};
