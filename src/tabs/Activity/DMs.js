import { Box, Card } from '@mui/material'
import axios from 'axios'
import { Ads } from 'components/Ads'
import { SearchBar } from 'components/SearchBar/SearchBar'
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
    }}>
        <Box sx={{
        }}>
            <Box sx={{
                display: "flex",
                justifyContent:  "space-between",
                alignItems: "center",
                p: 2,
            }}>
                <Box sx={{
                    mt: 2
                }}>
                    <p>Direct Messages</p>
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
            </Box>
            <SearchBar />
        </Box>
        {/* DMs */}
        <Box sx={{
            maxHeight: "55vh",
            overflow: "scroll",
            p:2,
            border: "solid",
            borderTopColor: 'rgba(0, 0, 0, 0.122)',
            borderLeftColor: 'rgba(0, 0, 0, 0.122)',
            borderRightColor: 'rgba(0, 0, 0, 0.122)',
            borderRadius: "20px 20px 0 0",
            borderWidth: 0.5,
            color: "rgba(0, 0, 0, 0.422)",
            fontSize: 15,
            background: "rgb(240 242 245)"
            
        }}>
            <Box sx={{
                display: "flex",
                gap: 2

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
                            width={45}
                        />
                </Box>
                <Box>
                    <h5 style={{color: "rgba(0, 0, 0, 0.622)"}}>{user?.name}</h5>
                    <p>You: Direct Messages</p>
                </Box>
            </Box>
            
            <Box sx={{
                display: "flex",
                gap: 2

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
                            width={45}
                        />
                </Box>
                <Box>
                    <h5 style={{color: "rgba(0, 0, 0, 0.622)"}}>{user?.name}</h5>
                    <p>Direct Messages</p>
                </Box>
            </Box>

            <Box sx={{
                display: "flex",
                gap: 2

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
                            width={45}
                        />
                </Box>
                <Box>
                    <h5 style={{color: "rgba(0, 0, 0, 0.622)"}}>{user?.name}</h5>
                    <p>Direct Messages</p>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                gap: 2

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
                            width={45}
                        />
                </Box>
                <Box>
                    <h5 style={{color: "rgba(0, 0, 0, 0.622)"}}>{user?.name}</h5>
                    <p>Direct Messages</p>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                gap: 2

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
                            width={45}
                        />
                </Box>
                <Box>
                    <h5 style={{color: "rgba(0, 0, 0, 0.622)"}}>{user?.name}</h5>
                    <p>Direct Messages</p>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                gap: 2

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
                            width={45}
                        />
                </Box>
                <Box>
                    <h5 style={{color: "rgba(0, 0, 0, 0.622)"}}>{user?.name}</h5>
                    <p>Direct Messages</p>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                gap: 2

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
                            width={45}
                        />
                </Box>
                <Box>
                    <h5 style={{color: "rgba(0, 0, 0, 0.622)"}}>{user?.name}</h5>
                    <p>Direct Messages</p>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                gap: 2

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
                            width={45}
                        />
                </Box>
                <Box>
                    <h5 style={{color: "rgba(0, 0, 0, 0.622)"}}>{user?.name}</h5>
                    <p>Direct Messages</p>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                gap: 2
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
                            width={45}
                        />
                </Box>
                <Box>
                    <h5 style={{color: "rgba(0, 0, 0, 0.622)"}}>{user?.name}</h5>
                    <p>Direct Messages</p>
                </Box>
            </Box>
        </Box>
    </Card>
  )
}
