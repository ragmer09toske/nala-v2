import { Box, Divider, Grid } from "@mui/material";
import { Skill } from "components/Skill";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Post = ({ componyName, levelOfExperties, discription, skills, timeStamp }) => {
 const SkillList = JSON.parse(skills)
 const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("AuthToken")) {
      navigate("/login")
    } 
  }, []);
  return (
    <div>
    <Box
        sx={{
          pr: { xs: 2, lg: 40 },
        }}
        className="Post"
    >
      <h4 style={{ color: "rgb(117, 211, 3" }}>{componyName}</h4>
      <p style={{ fontSize: "9px", color: "rgba(0, 0, 0, 0.479" }}>{timeStamp}</p>
      <h4>{levelOfExperties}</h4>
      <p style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.479)" }}>
        {discription.length > 150 ? `${discription.substring(0, 350)}...` : discription}
      </p>
      <h6 style={{ fontSize: "9px", color: "rgb(117, 211, 3" }}>more</h6>
      <Grid container spacing={1} style={{ maxWidth: '100%', overflowX: 'auto' }}>
        {SkillList.slice(0, 3).map((item, index) => (
          <Grid item xs={4} sm={6} md={4} lg={3} style={{ flexShrink: 0 }}>
            <Skill skill={item} />
          </Grid>
        ))}
      </Grid>
      <br />
    </Box>
    <Divider 
        sx={{
            pr: { xs: 2, lg: 40 },
        }}
    />
    </div>
  );
};
