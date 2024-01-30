import { Add, AttachFile, Brush, Visibility } from '@mui/icons-material'
import { Box, IconButton, Icon } from '@mui/material'
import axios from 'axios'
import PortCvBottomsheet from 'components/Bottomsheets/Portfolio'
import VideoPlayer from 'components/ReactVidplayer'
import CVUpload from 'components/upload/cv'
import React, { useEffect, useState } from 'react'
import URI_Server from 'uri'

export const PortCv = ({setProfileState, profileState}) => {
  const [loading, setLoading] = useState(false)
  const [aboutCurrentUser, setAboutCurrentUser] = useState()
  const [aboutCurrentUserPortfolio, setAboutCurrentUserPortfolio] = useState([])
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [aboutCurrentUserCV, setAboutCurrentUserCV] = useState([])
  const [portObj, setPortObj] = useState()
  const [cvIsOpen, setCvIsOpen] = useState()
  const [seeCV,setSeeCV] = useState(false)

    useEffect(() => {
      const fetchCurrentUser = async () => {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          },
        };
        try {
          const response = await axios.get(
            `https://${URI_Server}/nala/completedProfiles/${localStorage.getItem("selectedUserID")}`,
            config
          );
          setAboutCurrentUser(response.data);
          setLoading(false);
        } catch (e) {
          console.log(e.message);
          setLoading(false);
        }
      };
      fetchCurrentUser();
    }, []);

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  useEffect(() => {
    if (aboutCurrentUser && aboutCurrentUser.portfolio) {
      setAboutCurrentUserPortfolio(aboutCurrentUser.portfolio);
      try {
        var rawdata =  aboutCurrentUserPortfolio;
        var parsedData = JSON.parse(rawdata);
        setPortObj(parsedData);
      } catch (error) {
        console.error("Error parsing JSON: " + error);
      }
      console.log('Parsed ob:', aboutCurrentUserPortfolio )
    }
    if (aboutCurrentUser && aboutCurrentUser.cv) {
      setAboutCurrentUserCV(aboutCurrentUser.cv);
    }
  }, [aboutCurrentUser, aboutCurrentUserPortfolio, portObj]);

  useEffect(()=>{
    if(aboutCurrentUser?.portfolio){
      setProfileState(profileState + 14)
    }
  },[aboutCurrentUser])

  useEffect(()=>{
    if(aboutCurrentUser?.cv){
      setProfileState(profileState + 14)
    }
  },[aboutCurrentUserCV])
  
  return (
    <>
        <Box
          sx={{
            pl: 2,
            pr: 2,
            display: "flex",
            alignItems: "center",
            gap:1,
          }}
        >
          <h3 style={{ fontSize: "15px" }}>Portfolio ({aboutCurrentUserPortfolio.length})</h3>
        </Box>
       
        <VideoPlayer 
          videoLink={portObj?.link}
        />
        <Box sx={{
          pl:2,
          color: "rgb(117, 211, 3)"
        }}>
          <h6>{portObj?.title}</h6>
        </Box>
        <Box sx={{
          pl:2, 
          pr: 2,
          color: "gray"
        }}
        >
          <p style={{ fontSize: "15px" }}>{portObj?.description}</p>
        </Box>

        <Box
          sx={{
            pl: 2,
            pr: 2,
            pr: 2,
          }}>
          <h5>Your documents</h5>
        </Box>

        <Box
          sx={{
            pl: 2,
            pr: 2,
            display: "flex",
            alignItems: "center",
            gap:0.2
          }}
        >
          <h3 style={{ fontSize: "15px" }}>CV ({aboutCurrentUserCV?.length})</h3>
          <IconButton color="primary" aria-label="add" sx={{mt: -1}}>
            {!aboutCurrentUser?.cv ? (<Add onClick={()=>setCvIsOpen(true)}/>) : (
              <Visibility onClick={()=>setSeeCV(!seeCV)} />
            )}
          </IconButton>
        </Box>
        {seeCV && (<Box sx={{
            pl: 2,
            pr: 2,
            display: "flex",
            alignItems: "center",
            gap:0.2
        }}
        >
          <AttachFile sx={{ color: "#1a73e8" }}>attach_file</AttachFile>
          <a href={`${aboutCurrentUserCV}`} style={{ fontSize: "13px" }}>View your attached CV</a>
        </Box>)}
    </>
  )
}
