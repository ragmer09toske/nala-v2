// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import PersonIcon from "@mui/icons-material/Person"
import LogoutIcon from "@mui/icons-material/Logout"
// @mui material components
import Collapse from "@mui/material/Collapse";
import MKBox from "components/Material-kit/MKBox";
import { useNavigate } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import sebatso from "../../../assets/images/sebabatso.jpeg"

function DefaultNavbarMobile({ routes, open }) {
  const navigate = useNavigate()
  const handleProfile = () =>{
    navigate("/profile")
  } 
  const handleLogout =()=> {
    localStorage.removeItem("AuthToken")
    localStorage.removeItem("user_id");
    window.location.reload()
  }
 
  return (
    <Collapse in={Boolean(open)} timeout="auto" unmountOnExit>
      <MKBox width="calc(100% + 1.625rem)" my={2} ml={-2}>
        <Divider/>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5
        }}>
          <Box sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'baseline'
          }}>
            <Box>
              <PersonIcon />
            </Box>
            <Box>
              <h6 onClick={handleProfile}>Profile</h6>
            </Box>
          </Box>
        
        <Divider/>
          <Box sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'baseline'
          }}>
            <Box>
              <LogoutIcon />
            </Box>
            <Box>
              <h6 onClick={handleLogout}>logout</h6>
            </Box>
          </Box>
        </Box>
      </MKBox>
    </Collapse>
  );
}

// Typechecking props for the DefaultNavbarMobile
DefaultNavbarMobile.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

export default DefaultNavbarMobile;
