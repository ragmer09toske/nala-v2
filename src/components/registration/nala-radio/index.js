import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

export const NuRadio = ({radio}) => {
  
  return (
    <Box sx={{
        width: "40px",
        height: "40px",
        border: "solid",
        borderColor: !radio ? "rgba(0, 0,  0, 0.278)" : "#00c500",
        borderWidth: !radio ? 1 : 5,
        borderRadius: "50%",
        p:1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        }}>
        <Box sx={{
          width: !radio ? "20px" : "14px",
          height: !radio ? "20px" : "14px",
          border: "solid",
          borderColor: !radio ? "rgba(0, 0,  0, 0.278)" : "#00c500",
          background: radio && "#00c500",
          borderRadius: "50%"
        }}>
        </Box>
      </Box>
  )
}
