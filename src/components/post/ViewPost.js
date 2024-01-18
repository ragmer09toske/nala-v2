import { Box,Divider,Grid,Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BackIcon from "@mui/icons-material/ArrowBack"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { PinDrop, Verified } from '@mui/icons-material'
import { Skill } from 'components/Skill'
import { useNavigate } from 'react-router-dom'
import ApplyForPost from 'components/Bottomsheets/ApplyForPost'
export const ViewPost = () => {
  const [jobDetails, setJobDetails] =  useState({})
  const [SkillList, setSkillList] = useState([])
  const [GuidelinessList, setGuidelines] = useState([])
  const [RequirementssList, setRequirements] = useState([])
  const navigate = useNavigate()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("AuthToken")) {
      navigate("/login")
    } 
  }, []);
  const handleRedirect = () => {
    window.location.replace("www.nucleusdevs.com")
  }
  const handleBack = () => {
    navigate("/")
  }
  useEffect(() => {
    const retrievedDataString = localStorage.getItem("postDetails");
  
    if (retrievedDataString) {
      // Parse the JSON string back to an object
      const retrievedData = JSON.parse(retrievedDataString);
  
      // Check if the retrievedData has the companyName property
      if (retrievedData.companyName) {
        // Set the jobDetails state
        setJobDetails(retrievedData);
        const parsedSkillLiest = JSON.parse(retrievedData.skills)
        const parsedGuidelines = JSON.parse(retrievedData.guidelines)
        const parsedRequirements = JSON.parse(retrievedData.requirements)
        setSkillList(parsedSkillLiest)
        setGuidelines(parsedGuidelines)
        setRequirements(parsedRequirements)
        console.log("list is: ",RequirementssList)
      } else {
        console.log("No companyName found in retrievedData");
      }
    } else {
      console.log("No data found in local storage");
    }
  }, []);
  
  return (
    <Box sx={{
        background: "white"
    }}>
      <ApplyForPost isOpen={isBottomSheetOpen} onClose={closeBottomSheet} jobDetails={jobDetails} SkillList={SkillList}/>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: { xs: 2 },
            pl: { lg: 40 },
            pt: { lg: 5 },
            pr: { lg: 40 },
            position: "fixed",
            width: "100%",
            mt: -10,
            alignItems: "baseline",
        }}
        className="JobsDetailsHeader"
        >
            <Typography
                variant="h2"
            >
                <BackIcon onClick={handleBack} />
            </Typography>
            <Typography
                variant="h5"
            >
                Job Details
            </Typography>
            <Typography
                variant="h4"
            >
                <MoreVertIcon />
            </Typography>
        </Box>
        <Box
        sx={{
            mt: 10,
            pl: 2, 
            pr: 2, 
        }}
        > 
            <br/>
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: "center"
            }}>
                <Typography 
                    variant='h6'
                >
                    {jobDetails?.companyName}
                </Typography>
                <Verified sx={{color:"#1a73e8", fontSize: '5px'}}/>
            </Box>
            <p style={{ fontSize: "9px", color: "rgba(0, 0, 0, 0.479" }}>Deadline: {jobDetails?.deadline}</p>
            <br/>
            <h5 style={{ color: "rgb(117, 211, 3" }}>{jobDetails?.jobPosition}</h5>
            <p style={{ fontSize: "9px", color: "rgba(0, 0, 0, 0.479" }}>{jobDetails?.timeStemp}</p>
            <Box sx={{
                display: 'flex',
                alignItems: "baseline"
            }}>
                <Box>
                    <PinDrop sx={{color: "#1A73E8"}}/>
                </Box>
                <Box>
                    <p style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.879" }}>{jobDetails?.location}</p>
                </Box>
            </Box>
            <Divider />
            <Box sx={{
                maxWidth: "90vw",
                overflow: "scroll"
            }}>
                <p style={{ fontSize: "15px", color: "rgba(0, 0, 0, 0.979" }}>Details</p>
                <pre className="p-tag" style={{ color: "rgba(0, 0, 0, 0.620" }}>
                    {jobDetails?.description}
                </pre>
            </Box>
            <Divider />
            {SkillList.length > 0 &&
                <Box>
                <p style={{ fontSize: "15px", color: "rgba(0, 0, 0, 0.979" }}>Skills and Experties</p>
                <Grid container spacing={1} style={{ maxWidth: '100%', overflowX: 'auto' }}>
                    {SkillList.map((item, index) => (
                        <Grid item xs={4} sm={6} md={4} lg={3} style={{ flexShrink: 0 }}>
                        <Skill skill={item}/>
                        </Grid>
                    ))} 
                </Grid>
            </Box>}
            <br/>
            <Divider />
            { RequirementssList.length > 0 &&
                <Box>
                <p style={{ fontSize: "15px", color: "rgba(0, 0, 0, 0.979" }}>requirements</p>
                {RequirementssList.map((item, index)=>(
                    <Box>
                        <p key={index} style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.579" }}><span>{index + 1})</span>{item}</p>
                    </Box>
                ))}
            </Box>}
            <Divider />
            {GuidelinessList.length > 0 &&
                <Box>
                <p style={{ fontSize: "15px", color: "rgba(0, 0, 0, 0.979" }}>Guidelines</p>
                {GuidelinessList.map((item, index)=>(
                    <Box>
                        <p style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.579" }}><span>{index + 1}) </span>{item}</p>
                    </Box>
                ))}
            </Box>}
            <Divider />
        </Box>
        <Box
            sx={{
                display: 'flex',
                justifyContent: "center ",
                position: 'fixed',
                bottom: 0,
                width: '100%',
            }}
        >
            <p className='CTA' style={{ fontSize: "14px"}} onClick={()=>setIsBottomSheetOpen(true)}>Apply</p>
            <br/><br/>
        </Box>
    </Box>
  )
}
