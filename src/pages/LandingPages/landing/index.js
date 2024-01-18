import { Box, Icon } from "@mui/material";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import Artibox from "../../../assets/images/Artibox.png";
import Nucleus from "../../../assets/images/nucleus.png";
import React from "react";
import routes from "nonAuthRoute";
import { SearchBar } from "components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { AttachFile, Description, Hiking, Work } from "@mui/icons-material";

export const Landing = () => {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/register");
  };
  return (
    <Box>
      <DefaultNavbar routes={routes} dark sticky />
      <Box className="card-join">
        <Box>
          <p style={{ color: "white" }}>.</p>
        </Box>
        <Box
          sx={{
            mt: 10,
            pl: 2,
            pr: 2,
          }}
        >
          <SearchBar />
          <br />
          <h1 className="Welcome-top">Mosotho should never stay at home</h1>
          <h6 className="Welcome-Under ubuntu">
            Connecting Job seekers with their dreams, one opportunity at a time
          </h6>
        </Box>
        <br />
        <Box
          sx={{
            pl: 2,
            pr: 2,
          }}
        >
          <h6 className="Welcome-Under ubuntu" style={{ fontSize: 13 }}>
            Trusted by
          </h6>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: -1,
            }}
          >
            <Box>
              <img src={Artibox} width={30} alt="artibox"></img>
            </Box>
            <Box>
              <img src={Nucleus} width={25} alt="artibox"></img>
            </Box>
          </Box>
        </Box>
      </Box>
      <br />
      <Box
        sx={{
          pl: 2,
          pr: 2,
        }}
      >
        <div className="card-join">
          <br />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h6 className="Join-us-for-free">Join us for free</h6>
          </Box>
          <br />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, lightgray 50%, rgb(225,225,225) 100%)",
              }}
            ></Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 20,
                  background:
                    "linear-gradient(to right, rgb(245, 245, 245), lightgray)",
                  backgroundColor: "lightgray",
                  borderRadius: 5,
                }}
              ></Box>
              <Box
                sx={{
                  width: 120,
                  height: 20,
                  background:
                    "linear-gradient(to right, rgb(245, 245, 245), lightgray)",
                  borderRadius: 5,
                }}
              ></Box>
            </Box>
          </Box>
          <br />
          <Box
            sx={{
              display: "fkex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                background: "#00c500",
                justifyContent: "center",
                display: "flex",
                // alignItems: "center",
                pt: 1.5,
                width: 150,
                borderRadius: "30px",
              }}
            >
              <p style={{ color: "white" }} onClick={handleSignup}>
                Sign up
              </p>
            </Box>
          </Box>
          <br />
        </div>
        <br />
        <div className="card-join">
          <br />
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                fontSize: 35,
              }}
            >
              <Hiking />
            </Box>
            <Box>
              <h6 className="ubuntu" style={{ fontWeight: 900 }}>
                Join us for free
              </h6>
              <p
                className="ubuntu"
                style={{ fontSize: 11, color: "gray", marginTop: -7 }}
              >
                Take the first step towards your ideal career by registering to
                discover and explore a curated list of job opportunities that
                are currently available and perfectly suited for your skills and
                aspirations. Start your journey today!
              </p>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                fontSize: 35,
              }}
            >
              <Description />
            </Box>
            <Box>
              <h6 className="ubuntu" style={{ fontWeight: 900 }}>
                Create your CV
              </h6>
              <p
                className="ubuntu"
                style={{ fontSize: 11, color: "gray", marginTop: -7 }}
              >
                Craft a personalized and compelling resume that highlights your
                unique skills, experiences, and qualifications. Stand out to
                potential employers with a professionally designed curriculum
                vitae that tells your career story effectively.
              </p>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                fontSize: 35,
              }}
            >
              <Work />
            </Box>
            <Box>
              <h6 className="ubuntu" style={{ fontWeight: 900 }}>
                Upload your Portfolio
              </h6>
              <p
                className="ubuntu"
                style={{ fontSize: 11, color: "gray", marginTop: -7 }}
              >
                Create and exhibit a personalized collection of your projects,
                creations, and accomplishments. Explore the depth of your skills
                and expertise as you visually present your work to the world.
              </p>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                fontSize: 35,
              }}
            >
              <AttachFile />
            </Box>
            <Box>
              <h6 className="ubuntu" style={{ fontWeight: 900 }}>
                Attach your Transcripts
              </h6>
              <p
                className="ubuntu"
                style={{ fontSize: 11, color: "gray", marginTop: -7 }}
              >
                If you're a student with limited work experience, showcase your
                academic achievements by uploading your transcripts. Highlight
                your educational qualifications to stand out in the application
                process
              </p>
            </Box>
          </Box>
        </div>
        <br />
      </Box>
    </Box>
  );
};
