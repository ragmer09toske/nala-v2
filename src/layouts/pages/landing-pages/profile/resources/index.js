import { Box, Divider, IconButton } from '@mui/material'
import EyeIcon from "@mui/icons-material/Visibility"
import Analytics from "@mui/icons-material/AnalyticsOutlined"
import SearchIcon from "@mui/icons-material/Search"
import PeopleIcon from "@mui/icons-material/PeopleAltOutlined"
import {  ArrowForwardIos } from "@mui/icons-material";

export const Resource = () => {
  return (
    <Box sx={{
        pl: 2,
        pr: 2,
      }}>
        <h3 style={{ fontSize: "15px" }}>Analytics</h3>
        <Box sx={{
          display: "flex",
          gap: 1,
          alignItems: "center"
        }}>
          <EyeIcon style={{ color: "rgba(0, 0, 0, 0.622)" }}/>
          <p style={{ fontSize: "10px", color: "rgba(0, 0, 0, 0.622)", marginTop: 17 }}>Only you can see tihs</p>
        </Box>
        <div style={{
          display: "flex",
          gap: 2.5,
          alignItems: "center"
        }}> 
          <div>
            <PeopleIcon style={{ color: "rgba(0, 0, 0, 0.822)" }}/>
          </div>
          <div>
            <p style={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.822)", marginTop: 20 }}>1 Profile View</p>
          </div>
        </div>
        <Divider style={{backgroundColor: "gray"}}/>
        <Box sx={{
          display: "flex",
          gap: 1,
        }}>
          <SearchIcon style={{ color: "rgba(0, 0, 0, 0.822)" }}/>
          <Box>
            <p style={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.822)" }}>5 Search appearances</p>
            <p style={{ fontSize: "10px", color: "rgba(0, 0, 0, 0.622)" }}>See Queries</p>
          </Box>
        </Box>
        <Divider style={{backgroundColor: "gray"}}/>
        <h3 style={{ fontSize: "15px" }}>Resources</h3>
        <Box sx={{
          display: "flex",
          gap: 1,
          alignItems: "center"
        }}>
          <EyeIcon style={{ color: "rgba(0, 0, 0, 0.622)" }}/>
          <p style={{ fontSize: "10px", color: "rgba(0, 0, 0, 0.622)", marginTop: 17 }}>Only you can see tihs</p>
        </Box>
        <Box sx={{
          display: "flex",
          gap: 1,
        }}>
          <Analytics style={{ color: "rgba(0, 0, 0, 0.822)" }}/>
          <Box>
            <p style={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.822)" }}>5 Analysed areas of improvement</p>
            <p style={{ fontSize: "10px", color: "rgba(0, 0, 0, 0.622)" }}>Use Our NLP AI feature to improve on what you have already build </p>
          </Box>
        </Box>
        <Divider style={{backgroundColor: "gray"}}/>
        <Box sx={{
          display: 'flex',
          gap: 2,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <p style={{ fontSize: "17px", color: "rgba(0, 0, 0, 0.822)" }}>Get more resources</p>
        <IconButton color="primary" aria-label="add" sx={{mt: -1.7}}>
          <ArrowForwardIos sx={{ fontSize: "10px", color: "rgba(0, 0, 0, 0.822)" }} />
        </IconButton>
        </Box>
    </Box>
  )
}
