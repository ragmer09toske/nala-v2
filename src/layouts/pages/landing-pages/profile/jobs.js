import { Add, Brush, Visibility } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import axios from 'axios'
import JobBottomSheet from 'components/Bottomsheets/Job'
import ExperienceBottomSheet from 'components/Bottomsheets/experience'
import { ContentSkeleton } from 'components/Skeletons/ContentSkeleton'
import React, { useEffect, useState } from 'react'
import URI_Server from 'uri'

export const Jobs = ({setProfileState, profileState}) => {
  const [loading, setLoading] = useState(false)
  const [aboutCurrentUser, setAboutCurrentUser] = useState()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isBottomSheetOpenExperience, setIsBottomSheetOpenExperience] = useState(false);
  const [aboutCurrentUserExperience, setAboutCurrentUserExperience] = useState([])
  const [seeExperience, setSeeExperience] = useState()

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const closeBottomSheetExperience = () => {
    setIsBottomSheetOpenExperience(false);
  };
  
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

  useEffect(() => {
    if (aboutCurrentUser && aboutCurrentUser?.experience) {
      setAboutCurrentUserExperience(aboutCurrentUser.experience);
      setProfileState(profileState + 14)
    }
  }, [aboutCurrentUser]);

  return (
    <>
      <JobBottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet} bioValue={aboutCurrentUser?.job} />
      <ExperienceBottomSheet isOpen={isBottomSheetOpenExperience} onClose={closeBottomSheetExperience} bioValue={aboutCurrentUser?.experience} />
      {
      loading ?
      (<ContentSkeleton />)
      :
      (<Box>
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
            alignItems: "center",
            gap:0.2
          }}
        >
           {aboutCurrentUser?.job ? (<h3>{aboutCurrentUser?.job}</h3>)
          :
          (<h5>Profession</h5>)
          }
          <IconButton color="primary" aria-label="add" sx={{ height: "100%"}}>
            {aboutCurrentUser?.job ?(<Brush onClick={()=>setIsBottomSheetOpen(true)}/>) : (<Add onClick={()=>setIsBottomSheetOpen(true)} sx={{mt: -1}}/>)}
          </IconButton>
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
          <h3 style={{ fontSize: "15px" }}>Experience ({aboutCurrentUserExperience.length})</h3>
          <IconButton color="primary" aria-label="add" sx={{mt: -1}}>
            {aboutCurrentUser?.experience && (<Visibility onClick={()=>setSeeExperience(!seeExperience)}/>)}
          </IconButton>
          <IconButton color="primary" aria-label="add" sx={{mt: -1}}>
            {!aboutCurrentUser?.experience ? (<Add onClick={()=>setIsBottomSheetOpenExperience(true)}/>) : <Brush onClick={()=>setIsBottomSheetOpenExperience(true)}/>}
          </IconButton>
        </Box>
        {seeExperience && (<Box  sx={{
            pl: 2,
            pr: 2,
          }}>
          <p style={{fontSize:13}}>{aboutCurrentUser?.experience }</p>
        </Box>)}
      </Box>)}
    </>
  )
}
