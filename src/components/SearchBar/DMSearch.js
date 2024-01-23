import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField } from "@mui/material";
import "../../assets/css/index.css";
import SearchBottomSheet from "components/Bottomsheets/Search";

export const DMSearchBar = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
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
  );
};
