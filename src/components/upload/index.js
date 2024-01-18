import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import FilesImage from "../../assets/images/files.png"
import SmallerLoadSpinner from 'assets/theme/components/LoadSpiner';
import { Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import URI_Server from 'uri';

const FileUpload = ({ isOpen }) => {
  const [authToken, setAuthToken] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState()
  const animationProps = useSpring({
    transform: isOpen ? 'translateY(0%)' : 'translateY(100%)',
  });
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
        avatar: uploadResponse.data
      };

      try {
        const updateResponse = await axios.put(`https://${URI_Server}/nala/users/${localStorage.getItem("user_id")}`, avatarLink, {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
        });

        // Handle errors for the update request
        if (updateResponse.status !== 200) {
          console.error('Error updating user avatar:', updateResponse.statusText);
          // Handle update error
          return;
        }

        console.log('File uploaded and user avatar updated successfully:', updateResponse.data);
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
        height: '90.5%', // Set your desired height
        ...animationProps,
        backgroundColor: '#ffffffe7',
        backdropFilter: "blur(4.5px)",
        zIndex: 999
      }}
    >
    <Box
      isOpen={isOpen}
      sx={{
          width: '100%',
          height: '900px',
          margin: 'auto',
          display: 'flex',
          marginBottom: 10,
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
          <p style={{marginLeft: -10, opacity: 0.5}}>or drag & drop an image here</p>
      </div>
      {uploadedFile && <p>Selected file: {uploadedFile.name}</p>}
      {uploadedFile?.name && (<p onClick={handleUpload}>{loading ? <SmallerLoadSpinner /> :  "use image" }</p>)}
    </Box>
    </animated.div>
  );
};

export default FileUpload;
