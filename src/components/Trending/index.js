import { Box } from '@mui/material';
import React from 'react';

export const Trending = () => {
  return (
    <Box sx={{
      overflowY: "scroll",  // Enable vertical scrolling
      maxHeight: "200px",   // Set a max height to limit scrollable area
      width: "70%",        // Take full width of the parent container
      border: "1px solid rgba(0, 0, 0, 0.1)",  // Optional: Add a border for visualization
      borderRadius: "5px", // Optional: Add rounded corners for visualization
      zIndex: 999
    }}>
      <Box sx={{
        display: "flex",
        gap: 5,
        p: 2,
        width: "max-content", // Adjusted to the content width
        margin: "auto",       // Center the content horizontally
      }}>
        {/* First Category */}
        <Box sx={boxStyle}>
          Big brands
        </Box>

        {/* Second Category */}
        <Box sx={boxStyle}>
          Work from home
        </Box>

        {/* Third Category */}
        <Box sx={boxStyle}>
          Part-time
        </Box>

        {/* Fourth Category */}
        <Box sx={boxStyle}>
          Engineering
        </Box>

        {/* Fifth Category */}
        <Box sx={boxStyle}>
          Design
        </Box>
        
        {/* Add more categories by copying the Box component above and modifying the text */}
      </Box>
    </Box>
  );
};

// Style object for individual category box
const boxStyle = {
  border: "solid",
  borderColor: "rgba(0, 0, 0, 0.567)",
  borderRadius: 5,
  color: 'rgba(0, 0, 0, 0.567)',
  p: "0 15px",  // Adjusted padding for better appearance
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 12,
  whiteSpace: "nowrap", // Prevent text wrapping if needed
};
