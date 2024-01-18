import { Alarm, Wallet } from '@mui/icons-material'
import { Box } from '@mui/material'
import React from 'react'
import { FiClock } from 'react-icons/fi'
import web_dev from "../../assets/images/web_development.png"

export const Ads = () => {
  return (
    <Box sx={{
        pt:5
    }}>
        <Box sx={{
            borderRadius: "0 0 5px 5px",
            background: "white",
        }}
        
        >
            <Box sx={{
                background: "linear-gradient(to top, #87CEFA, white)",  // Gradient from bottom to top
                pt: 2,
                // p:5,
            }}>
                <img src={web_dev} alt='web_dev' width="100%"/>
            </Box>
            <Box sx={{
                pt: 2,
                p:5,
            }}>
                <h4>Full Stack Development</h4>
                <p style={{fontSize: 13}}>courses with guranteed Internship</p>
                <Box sx={{
                    display: "flex",
                    gap: 1
                }}>
                    <FiClock />
                    <p style={{fontSize: 13, color: "rgba(0, 0, 0, 0.567)"}}>6 months course</p>
                </Box>
                <Box sx={{
                    display: "flex",
                    gap: 1
                }}>
                    <Wallet />
                    <p style={{fontSize: 13, color: "rgba(0, 0, 0, 0.567)"}}>Get comfirmed stippent payment</p>
                </Box>
                <Box sx={{
                    display: "flex",
                    gap: 1
                }}>
                    <Alarm />
                    <p style={{fontSize: 13, color: "rgba(0, 0, 0, 0.567)"}}>Have the Internships popup on your email</p>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}
