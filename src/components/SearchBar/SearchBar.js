import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ExpandIcon from "@mui/icons-material/Fullscreen";
import { Box, IconButton, TextField } from "@mui/material";
import "../../assets/css/index.css";
import axios from "axios";
import SearchBottomSheet from "components/Bottomsheets/Search";

export const SearchBar = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  // const handleExpand = () =>{
  //   window.location.href = "https://nala-sand.vercel.app"
  // }
  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };
  return (
    <Box>
      <SearchBottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet} />
      <div className="nu-searchBar">
        <Box>
          <SearchIcon  />
        </Box>
        <TextField
          onClick={()=>setIsBottomSheetOpen(true)}
          size="small"
          fullWidth
          label="Jobs"
          variant="outlined"
          placeholder="Search"
          InputProps={{
            style: {
              color: "gray", // Text color
            },
          }}
        />
          {/* <IconButton color="primary" aria-label="add">
            <ExpandIcon onClick={handleExpand}/>
          </IconButton> */}
      </div>
    </Box>
  );
};
