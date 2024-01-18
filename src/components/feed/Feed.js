import { Box, Card } from "@mui/material";
import axios from "axios";
import LoadingModal from "components/loadingModel/LoadingModels";
import { Post } from "components/post/Post";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import URI_Server from "uri";

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const [networkError, setnetworkError] = useState("")
  const handleNavigate = (data) => {
    // Convert the data object to a JSON string
    const dataString = JSON.stringify(data);
    localStorage.setItem("postDetails",dataString)
    navigate("/post")
  }
  useEffect(() => {
    const fetchPosts = async () => {
      setnetworkError()
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTA2MDRkOWYzN2VmMWIyMjM3YTAxYyIsIm5hbWUiOiJSZXRzZXBpbGUgU2hhbyAiLCJlbWFpbCI6InJldHNlcGlsZS5yYXltb25kc2hhb0BnbWFpbC5jb20iLCJpYXQiOjE3MDI4Nzg2NDh9.QOoP7if8RGMLR7bW-sGR8XailJEiG-g7NTZwkFq0VFM`, 
        },
      };
      try {
        const response = await axios.get(
          `https://${URI_Server}/posts`,
          config
        );
        setPosts(response.data.reverse());
        setLoading(false)
        console.log(response.data);
      } catch (e) {
        console.log(e.message);
        setLoading(false)
        setnetworkError(e.message)
      }
    };
    fetchPosts();
  }, []);

  return (
    <Box>
      {loading && <LoadingModal isOpen={isOpen} />}
      {!loading &&
        <Card
        sx={{
          p: { xs: 2, lg: 10 },
          mx: { xs: 1, lg: 18 },
          mt: -30,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
        }}
      >
        {networkError && <div><h6>{networkError}</h6></div>}
        {posts.map((data, key) => (
          <div key={data._id} onClick={()=>handleNavigate(data)}>
            <Post
              componyName={data?.companyName}
              levelOfExperties={data?.jobPosition}
              discription={data?.description}
              skills={data?.skills}
              timeStamp = {data?.timeStemp}
            />
          </div>
        ))}
      </Card>}
    </Box>
  );
};
