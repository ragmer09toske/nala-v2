import { Add, Brush } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import axios from 'axios'
import BottomSheet from 'components/Bottomsheets/Bio'
import { ContentSkeleton } from 'components/Skeletons/ContentSkeleton'
import React, { useEffect, useState } from 'react'
import URI_Server from 'uri'

export const About = ({profileState,setProfileState}) => {
  const [loading, setLoading] = useState(false)
  const [aboutCurrentUser, setAboutCurrentUser] = useState()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

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
          `https://${URI_Server}/nala/completedProfiles/${localStorage.getItem("user_id")}`,
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

  useEffect(()=>{
    if(About){
      localStorage.setItem('CurrentUserDetails',aboutCurrentUser)
      setProfileState(profileState + 14)
    }else{
      localStorage.setItem('CurrentUserDetails',"No data found")
    }
  },[About])
  
  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <Box>
      <BottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet} bioValue={aboutCurrentUser?.bio} />
      {
      loading ?
      (
        <ContentSkeleton />
      ) : (
      <Box>
        <Box
         sx={{
            pl: 2,
            pr: 2,
          }}>
            <h4>Bio</h4>
        </Box>
        <Box
          sx={{
            pl: 2,
            pr: 2,
          }}>
        </Box>
        <Box
          sx={{
            pl: 2,
            pr: 2,
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {aboutCurrentUser?.bio ? (<h5 style={{ fontSize: "15px", color: "gray" }}>{aboutCurrentUser?.bio}</h5>)
          :
          (<h5 style={{ fontSize: "15px", color: "gray", marginTop: 20 }} >Add</h5>)
          }
          <IconButton color="primary" onClick={()=>{setIsBottomSheetOpen(true)}} aria-label="add" sx={{ height: "100%"}}>
          {aboutCurrentUser?.bio ?(<Brush onClick={()=>{setIsBottomSheetOpen(true)}}/>) : (<Add />)}
          </IconButton>
        </Box>
      </Box> 
      )
    }
    </Box>
  )
}
