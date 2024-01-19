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
        position: 'absolute',
        minWidth: "100vw"
    }}>
        <Box sx={{
            background: "black"
        }}>
            <Box sx={{
                display: "flex",
                justifyContent:  "space-between",
                p: 2,
            }}>
                <p>Direct Messages</p>
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
            maxHeight: "47vh",
            overflow: "scroll",
            p:2
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
                    <h5>{user?.name}</h5>
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
                    <h5>{user?.name}</h5>
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
                    <h5>{user?.name}</h5>
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
                    <h5>{user?.name}</h5>
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
                    <h5>{user?.name}</h5>
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
                    <h5>{user?.name}</h5>
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
                    <h5>{user?.name}</h5>
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
                    <h5>{user?.name}</h5>
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
                    <h5>{user?.name}</h5>
                    <p>Direct Messages</p>
                </Box>
            </Box>
        </Box>
    </Card>
  )
}
