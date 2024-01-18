import { Close, MoreVert, PinDrop, Verified } from '@mui/icons-material';
import { Box,Icon, Divider, Grid, Typography } from '@mui/material';
import SmallerLoadSpinner from 'assets/theme/components/LoadSpiner';
import axios from 'axios';
import { Skill } from 'components/Skill';
import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import URI_Server from 'uri';

const ApplyForPost = ({ isOpen, onClose, jobDetails, SkillList }) => {
  const [loading, setLoading] = useState()
  const [bio, setBio] = useState()
  const [bio_ID, setBio_ID] = useState()
  const [seeFiles, setSeeFiles] = useState()
  const [run, setRun] = useState()

  const animationProps = useSpring({
    transform: isOpen ? 'translateY(0%)' : 'translateY(100%)',
  });

 let description = jobDetails?.discription
 useEffect(()=>{
  const getBio_ID = async ()=> {
    try{
      const response = await axios.get(`https://${URI_Server}/${localStorage.getItem("user_id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`
        },
      });
      setBio_ID(response.data)
      console.log(response.data)
    }catch(e){
      
    }
  }
  getBio_ID()
 },[run])

  useEffect(()=>{
    if(!bio_ID?._id){
      const init_fk = async () => {
        try{
          const newBio = {
            f_k: localStorage.getItem("user_id"),
          };
          const response = await axios.post(`https://${URI_Server}/nala/completeProfile`, newBio, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`
          },
        });
        setRun(true)
        }catch(e){
          console.error('There was a problem while updating bio..:', e);
        }
      }
      init_fk()
    }
  },[])

  const updateBio = async ()=> {
    setLoading(true)
    const newBio = {
      bio: bio,
    };
    try{
      const response = await axios.put(`https://${URI_Server}/nala/completedProfile/${bio_ID._id}`, newBio, {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`
        },
      });
      setLoading(false)
      window.location.reload()
    }catch(e){
      console.error('There was a problem while updating bio:', e);
      setLoading(false)
    }
  }
  
  return (
    <animated.div
      style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100%', // Set your desired height
        backgroundColor: 'white',
        // boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
        ...animationProps,
        zIndex: 999
      }}
    >
      <Box sx={{p:2, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Close  onClick={onClose} />
        <h5>Submit Proposal</h5>
        <MoreVert />
      </Box>
      <Divider />
      <Box sx={{pt:2}}>
        <Box sx={{p:2}}>
          <h6>Job Details</h6>
          <h6 style={{ color: "rgb(117, 211, 3)" }}>{jobDetails?.jobPosition}</h6>
          {SkillList.length > 0 &&
                <Box>
                <Grid container spacing={1} style={{ maxWidth: '100%', overflowX: 'auto' }}>
                    {SkillList.map((item, index) => (
                        <Grid item xs={4} sm={6} md={4} lg={3} style={{ flexShrink: 0 }}>
                        <Skill skill={item}/>
                        </Grid>
                    ))} 
                </Grid>
            </Box>}
          <p style={{ fontSize: "9px", color: "rgba(0, 0, 0, 0.479" }}>Deadline: {jobDetails?.deadline}</p>
          <p style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.479)" }}>
            {jobDetails?.description && jobDetails.description.length > 250
              ? jobDetails.description.substring(0, 250) + "..."
              : jobDetails.description}
          </p>
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
        </Box>
        <Divider/>
        <Box sx={{pl:2, pr:2}}>
          <h6>Cover letter</h6>
        </Box>

        <Box sx={{pl:2, pr: 4}}>
            <textarea cols={45} style={{ fontSize: "13px", padding:5, borderColor:"#4caf50", borderWidth: 2, borderRadius: 3}} rows={3}/>
        </Box>

        <Box sx={{p:2}}>
          <h6>More details</h6>
          <Box sx={{
            border: "solid",
            borderColor: "#4caf50",
            borderRadius: 30,
            p: 1,
            pb: 0,
            width: 200,
            borderWidth:2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center" }}>
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: "center",
                mb:1,
                color: "#4caf50",
                fontSize: "20px",
            }}
              onClick={()=>setSeeFiles(!seeFiles)}
            >
                <Typography 
                    variant='h6'
                    sx={{
                      color: "#4caf50",
                      fontSize: "13px",
                    }}  
                >
                    Files Attached
                </Typography>
              <Icon>attach_file</Icon>
            </Box>
            
          </Box>
          {seeFiles && (
          <Box sx={{
            p:2
          }}>
            <p style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.479)" }}>
                This includes the documants you uploaded on  your profile
            </p>
          </Box>)}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: "center ",
            position: 'fixed',
            gap: 1,
            bottom: 0,
            width: '100%',
        }}
        >
          <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: "center",
                mb:2
            }}>
                <Typography 
                    variant='h6'
                >
                    {jobDetails?.companyName}
                </Typography>
                <Verified sx={{color:"#1a73e8", fontSize: '5px'}}/>
            </Box>
          {!loading ? (<Box className="bottom-options" onClick={updateBio}>
             <p style={{background: "#4caf50", color: "white", borderColor: "#4caf50"}} className="CTA-outlined">Apply</p>
          </Box>) : (<SmallerLoadSpinner />)}
        </Box>
      </Box>
    </animated.div>
  );
};

export default ApplyForPost;
