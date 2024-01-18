import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PinIcon from "@mui/icons-material/MyLocation";
import { Brush, Close } from "@mui/icons-material";
import axios from "axios";
import { NuSkeleton } from "components/userSkeleton/skeloton";
import FileUpload from "components/upload";
import { PortCv } from "./portCv";
import { Resource } from "./resources";
import ProgressBarNala from "./ProgressBar";
import BootstrapProgrossBar from "./BootstrapProgrossBar";
import { Jobs } from "./jobs";
import { About } from "./About";
import { ContentSkeleton } from "components/Skeletons/ContentSkeleton";
import URI_Server from "uri";

export const Profile = () => {
  const [currentUser, setCurrentuser] = useState({});
  const [loading, setLoading] = useState(true);
  const [AboutLoading, setAboutLoading] = useState();
  const [isOpen, setIsOpen] = useState(false)
  const [profileState, setProfileState] = useState(0)
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  useEffect(() => {
    if (!localStorage.getItem("AuthToken")) {
      navigate("/login")
    } 
  }, []);
  
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
          `https://${URI_Server}/nala/users/${localStorage.getItem("user_id")}`,
          config
        );
        setCurrentuser(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);
 
  return (
    <>
      <>
      {loading && <ProgressBarNala />}
      <FileUpload isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
      <Box sx={{
        background: "white"
      }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: { xs: 2 },
            pl: { lg: 40 },
            pt: { lg: 5 },
            pr: { lg: 40 },
            position: "fixed",
            width: "100%",
            mt: -8.5,
            alignItems: "baseline",
            zIndex: 999
          }}
          className="JobsDetailsHeader"
        >
          <Typography variant="h2">
            <BackIcon onClick={handleBack} />
          </Typography>
          <Typography variant="h5">Profile</Typography>
          <Typography variant="h4">
            {!isOpen ? (<MoreVertIcon />) : (<Close onClick={()=>setIsOpen(false)} />)}
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 8.5,
          }}
        >
          <br/>
          {<>
          {loading ?
          (<NuSkeleton />)
          :
          (<Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              pl: 2
            }}
          >
            <Box>
            <div className="nu-avatar">
              <img
                src={currentUser?.avatar ? currentUser?.avatar :
                  `https://storage.googleapis.com/nala-6d763.appspot.com/1696141797476_IMG-20230815-WA0001.jpg`
                }
                alt="ionman"
                className="avatar-image"
              />
              
            </div>
            
            <Box sx={{
              background: "#fff",
              border: "solid",
              borderRadius: "50%",
              p:1,
              borderColor: "black",
              width: 35,
              height: 35,
              display:"flex",
              justifyContent: "center",
              alignItems: "center",
              position:"absolute",
              zIndex:10,
              // bottom: 0
              top:163,
              left: 15
            }}
            onClick={
              ()=>setIsOpen(true)
            }
            >
              <Brush />
            </Box>
            </Box>
            <Box>
              <h5>{currentUser?.name}</h5>
              <Box  
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "baseline"
              }}
              >
                <PinIcon style={{color: '#1a73e8'}}/>
                <div>
                  <p style={{ fontSize: "12px", marginBottom: 5 }}>{currentUser?.district}, Lesotho</p>
                </div>
              </Box>
              <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: "center"
              }}>
                <h6 className="CTA-outlined" style={{ fontSize: "12px", marginTop: 8 }}>Availabe for a new job</h6>
                <h5 style={{ fontSize: "13px", marginTop: 8, color: "#fb8c00"}}>yes</h5>
              </Box>
            </Box>
          </Box>)
          }
          </>}
        </Box>
        { (!loading) ?
          (<Box>
            <Divider style={{backgroundColor: 'gray', height: 8}}/>
            <BootstrapProgrossBar completionPercentage={profileState}/>
            <Divider style={{backgroundColor: 'gray', height: 8}}/>
            <About setProfileState={setProfileState} profileState={profileState} setLoading={setAboutLoading} />
            <Divider style={{backgroundColor: 'gray', height: 8}}/>
            <Jobs setProfileState={setProfileState} profileState={profileState}/>
            <Divider style={{backgroundColor: 'gray', height: 8}}/>
            <PortCv setProfileState={setProfileState} profileState={profileState}/>
            <Divider style={{backgroundColor: 'gray', height: 8}}/>
            {/* <Resource /> */}
            {/* <Divider style={{backgroundColor: 'gray', height: 8}}/> */}
          </Box>
          ) : (
            <>
              <Divider style={{backgroundColor: 'gray', height: 8}}/>
              <ContentSkeleton />
              <Divider style={{backgroundColor: 'gray', height: 8}}/>
              <ContentSkeleton />
              <Divider style={{backgroundColor: 'gray', height: 8}}/>
              <ContentSkeleton />
              <Divider style={{backgroundColor: 'gray', height: 8}}/>
              <ContentSkeleton />
            </>
          )
        }
      </Box>
    </>
  );
};
