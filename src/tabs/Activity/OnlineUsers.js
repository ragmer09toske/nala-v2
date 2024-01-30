import { Box, Divider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import URI_Server from 'uri';

export const OnlineUsers = () => {
  const [load, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const [selectedUserID, setUserID] = useState([]);
  const navigate = useNavigate()
  const fetchCurrentUser = async () => {
    setLoading(true);
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

      setUser(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  };

  const fetchAllUser = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
      },
    };

    try {
      const response = await axios.get(
        `https://${URI_Server}/nala/users`,
        config
      );

      setAllUser(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  };

  const handleUserClick = (userId) => {
    setUserID(userId)
    localStorage.setItem("selectedUserID", userId)
    navigate("/userprofile")
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchAllUser();
  }, []);

  return (
    <Box>
      <Box sx={{
        maxWidth: "90vw",
        display: "flex",
        gap: 2,
        overflow: "scroll"
      }}>
        {allUser && allUser.map((apiUser) => (
          <Box key={apiUser.id} onClick={() => handleUserClick(apiUser._id)}>
            <img
              src={apiUser.avatar}
              style={{ borderRadius: 10, cursor: 'pointer' }}
              alt={apiUser.name}
              width={40}
            />
          </Box>
        ))}
      </Box>
      <Divider sx={{ background: "gray" }} />
    </Box>
  );
}
