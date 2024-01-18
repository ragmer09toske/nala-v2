import React from 'react'
import construction from "../../assets/images/Construction-Law-scaled-1.jpg"
import { Box } from '@mui/material'
import TypingAnimation from './typing'
import qr_code from "../../assets/images/nala-qr.jpeg"

export const HelloWorld = () => {
  return (
    <Box sx={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>
      <div style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <img src={construction} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt='u  ' />
      </div>
      <Box sx={{
        position: "absolute",
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}>
        <Box sx={{
          p:2,
          pt:5,
          pr: 10,
          pl: 10,
          width: "100%",
          height: "100%",
          display: "flex",
          gap: 2,
          justifyContent: "space-between"
        }}>
          <Box sx={{
            background: "rgba(0, 0, 0, 0.722)",
            border: "solid",
            borderColor: "rgba(211, 211, 211, 0.072)",
            height: 650,
            width: "70%",
            borderRadius: 3,
            p:5
          }}>
            <TypingAnimation />
            <br/>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <p style={{color: "white"}}>Use the QR to launch the app on your Phone</p>
              <img src={ qr_code } alt='nala_qr' width={150} />
            </Box>
          </Box>
          <iframe src="https://nala-web.vercel.app" height={650} width={340} title='nala' style={{borderRadius: 10}}></iframe>
        </Box>
      </Box>
    </Box>
  )
}
