import { Box, Card } from '@mui/material'
import axios from 'axios'
import { DMSearchBar } from 'components/SearchBar/DMSearch'
import ProgressBarNala from 'layouts/pages/landing-pages/profile/ProgressBar'
import React, { useEffect, useState } from 'react'
import URI_Server from 'uri'

export const DMs = () => {
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
                    <h3>Direct Messages</h3>
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
            <ProgressBarNala />
            <Box sx={{
                maxWidth: "90vw",
            }}>
                <Box>
                    <img
                        src={user?.avatar}
                        style={{ borderRadius: 10 }}
                        alt={user?.name}
                        width={40}
                    />
                </Box>
            </Box>
            <Box sx={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Box sx={{
                    display: "flex",
                    gap: 2,
                }}>
                    <Box
                        sx={{
                            borderRadius: 5,
                        }}
                    >
                        <img
                            src={user?.avatar}
                            style={{ borderRadius: 10 }}
                            alt={user?.name}
                            width={40}
                        />
                        <Box sx={{
                            background: "#00c500",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            position: "absolute",
                            left: 32,
                            top: 45,
                        }}></Box>  
                    </Box>
                    <Box>
                        <h5 style={{color: "rgba(0, 0, 0, 0.622)", fontSize: 13}}>{user?.name}</h5>
                        <Box sx={{
                            mt: -1
                        }}>
                            <p>You: Direct Messages</p>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <h6 style={{
                        marginTop: 5
                    }}>Dec 25</h6>
                </Box>
            </Box>
            <br/>
            <Box sx={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Box sx={{
                    display: "flex",
                    gap: 2,
                }}>
                    <Box
                        sx={{
                            borderRadius: 5,
                        }}
                    >
                        <img
                            src={user?.avatar}
                            style={{ borderRadius: 10 }}
                            alt={user?.name}
                            width={40}
                        />
                        <Box sx={{
                            background: "#00c500",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            position: "absolute",
                            left: 32,
                            top: 45,
                        }}></Box>  
                    </Box>
                    <Box>
                        <h5 style={{color: "rgba(0, 0, 0, 0.622)", fontSize: 13}}>{user?.name}</h5>
                        <Box sx={{
                            mt: -1
                        }}>
                            <p>You: Direct Messages</p>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <h6 style={{
                        marginTop: 5
                    }}>Dec 25</h6>
                </Box>
            </Box> 
        </Box>
    </Card>
  )
}
