import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import FilesImage from "../../assets/images/files.png"
import SmallerLoadSpinner from 'assets/theme/components/LoadSpiner';
import { Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { Close, MoreVert } from '@mui/icons-material';
import URI_Server from 'uri';

const CVUpload = ({ isOpen, onClose }) => {
  const [authToken, setAuthToken] = useState(null);
  const [bio_ID, setBio_ID] = useState()
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState()
  const [run, setRun] = useState()
  const animationProps = useSpring({
    transform: isOpen ? 'translateY(0%)' : 'translateY(100%)',
  });

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

  useEffect(() => {
    // Retrieve the authentication token from localStorage
    const storedAuthToken = localStorage.getItem('AuthToken');
    setAuthToken(storedAuthToken);
  }, []);

  const onDrop = (acceptedFiles) => {
    setUploadedFile(acceptedFiles[0]);
  };

  const handleUpload = async () => {
    if (!uploadedFile) {
      alert('Please select a file.');
      return;
    }
    setLoading(true)
    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const uploadResponse = await axios.post(`https://${URI_Server}/nala/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`
        },
      });

      // Handle errors for the upload request
      if (uploadResponse.status !== 200) {
        console.error('Error uploading file:', uploadResponse.statusText);
        // Handle upload error
        return;
      }

      const avatarLink = {
        cv: uploadResponse.data
      };

      try {
        const response = await axios.put(`https://${URI_Server}/nala/completedProfile/${bio_ID._id}`, avatarLink, {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
        });

        // Handle errors for the update request
        if (response.status !== 200) {
          console.error('Error updating user avatar:', response.statusText);
          // Handle update error
          return;
        }

        console.log('File uploaded and user avatar updated successfully:', response.data);
        // Do something with the response if needed
        setLoading(false)
        window.location.reload()
      } catch (updateError) {
        console.error('Error updating user avatar:', updateError);
        setLoading(false)
      }

    } catch (uploadError) {
      console.error('Error uploading file:', uploadError);
      setLoading(false)
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Specify accepted file types if needed
  });

  return (
    <animated.div
      style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100%', // Set your desired height
        ...animationProps,
        backgroundColor: '#ffffffe7',
        backdropFilter: "blur(4.5px)",
        zIndex: 999
      }}
    >
    <Box sx={{p:2, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <Close onClick={()=>onClose(false)}/>
    </Box>
    <Box
      isOpen={isOpen}
      sx={{
          width: '100%',
          height: '900px',
          margin: 'auto',
          display: 'flex',
          // marginTop: -20,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          borderColor: 'rgba(0, 0, 0, 0.0)',
      }}
    >

      <div {...getRootProps()} style={{ cursor: 'pointer' }}>
        <input {...getInputProps()} />
          <Box sx={{ml:1.3}}>
            <img src={FilesImage}  width={200}/>
          </Box>
          <p className='CTA-primary'>Browse</p>
          <br/>
          <br/>
          <br/>
          <p style={{marginLeft: -40, opacity: 0.5}}>or drag & drop an document here</p>
      </div>
      {uploadedFile && <p style={{ fontSize: "10px" }}>Selected file: {uploadedFile.name}</p>}
      {uploadedFile?.name && (<p onClick={handleUpload}>{loading ? <SmallerLoadSpinner /> :  "use document" }</p>)}
    </Box>
    </animated.div>
  );
};

export default CVUpload;
