import { Close, MoreVert } from '@mui/icons-material';
import { Box, Divider } from '@mui/material';
import SmallerLoadSpinner from 'assets/theme/components/LoadSpiner';
import axios from 'axios';
import VideoPlayer from 'components/ReactVidplayer';
import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import URI_Server from 'uri';

const PortCvBottomsheet = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState()
  const [bio, setBio] = useState()
  const [bio_ID, setBio_ID] = useState()
  const [run, setRun] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [link, setLink] = useState()
  const animationProps = useSpring({
    transform: isOpen ? 'translateY(0%)' : 'translateY(100%)',
  });

  let Portfolio = {
    title: "",
    description: "",
    link: ""
  }

 useEffect(()=>{
  const getBio_ID = async ()=> {
    try{
      const response = await axios.get(`https://${URI_Server}/nala/completedProfiles/${localStorage.getItem("user_id")}`, {
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
  Portfolio.title = title
  Portfolio.description = description
  Portfolio.link = link
 },[title,description, link])

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
    const stringedPort = JSON.stringify(Portfolio)
    console.log(stringedPort)
    const newBio = {
      portfolio: stringedPort,
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
        <h5>Portfolio</h5>
        <MoreVert />
      </Box>
      <Divider />
      <Box sx={{pt:2}}>
        <Box sx={{pl:2, pr:2, pb: 1}}>
          <p style={{ fontSize: "13px", color:"rgba(0, 0, 0, 0.779)"}}>Title</p>
          <Box>
            <input  style={{ fontSize: "13px", padding:5, borderColor:"#4caf50", borderWidth: 2, borderRadius: 3}} placeholder='Enter a decsriptive title' value={title} onChange={(e)=>setTitle(e.target.value)} />
          </Box>
        </Box>
        
        <Box sx={{pl:2, pr: 4}}>
          <p  style={{ fontSize: "13px", color:"rgba(0, 0, 0, 0.779)"}}>
            Description
          </p>
            <textarea cols={45} style={{ fontSize: "13px", padding:5, borderColor:"#4caf50", borderWidth: 2, borderRadius: 3}} rows={3} placeholder='Describe this event' value={description} onChange={(e)=>setDescription(e.target.value)} />
        </Box>
        <Box sx={{pl:2, pr: 4}}>
          <p  style={{ fontSize: "13px", color:"rgba(0, 0, 0, 0.779)"}}>
            Link
          </p>
          <input  style={{ fontSize: "13px", padding:5, borderColor:"#4caf50", borderWidth: 2, borderRadius: 3}} placeholder='link of the video' value={link} onChange={(e)=>setLink(e.target.value)}/>
        </Box>
        <Divider />
        <Box sx={{pl:2, pr: 4}}>
            <h6>Example</h6>
        </Box>
        <VideoPlayer 
          videoLink={"https://www.youtube.com/watch?v=qo_wjWTjFHE&t=28s"}
        />
        <Box sx={{
          pl:2,
          color: "rgb(117, 211, 3)"
        }}>
          <h6>Retspile Raymond Shao at the UNDP launch</h6>
        </Box>
        <Box sx={{
          pl:2, 
          pr: 2,
          color: "gray"
        }}
        >
          <p style={{ fontSize: "15px" }}>This event was help by the UNDP in collaboration with our Local Universities, My role was to share my experience as innovator</p>
        </Box>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            gap: 2,
            bottom: 0,
            width: '100%',
          }}
        >
          <Box onClick={onClose}>
           <p className="CTA-outlined">Cancel</p>
          </Box>
          {!loading ? (<Box className="bottom-options" onClick={updateBio}>
             <p style={{background: "#1a73e8", color: "white", borderColor: "#1a73e8"}} className="CTA-outlined">Save</p>
          </Box>) : (<SmallerLoadSpinner />)}
        </Box>
      </Box>
    </animated.div>
  );
};

export default PortCvBottomsheet;
