import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField } from "@mui/material";
import "../../assets/css/index.css";
import SearchBottomSheet from "components/Bottomsheets/Search";
import { Mic, MicExternalOn } from "@mui/icons-material";

export const DMSearchBar = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };
  return (
    <Box sx={{
      p: 2,
    }}>
      <Box sx={{
        background: '#f0f2f5',
        borderRadius: 3,
        pl: 1,
        pr: 2,
      }}>
        <SearchBottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet} />
        <div className="nu-searchBar">
          <Box>
            <Mic  />
          </Box>
          <TextField
            onClick={()=>setIsBottomSheetOpen(true)}
            size="small"
            fullWidth
            label="Jump to or search..."
            variant="outlined"
            placeholder="Search"
            InputProps={{
              style: {
                color: "gray", // Text color
              },
            }}
          />
        </div>
      </Box>
    </Box>
  );
};
