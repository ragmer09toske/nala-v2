import { Close, MoreVert } from '@mui/icons-material';
import { Box, Card, Divider, IconButton, TextField } from '@mui/material';
import SmallerLoadSpinner from 'assets/theme/components/LoadSpiner';
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import URI_Server from 'uri';

const SearchBottomSheet = ({ isOpen, onClose, bioValue }) => {
  const [ searchable, setSearchable ] = useState("")
  const [searchedPost,setSearchedPost] = useState(null)
  const [loading, setLoading] = useState()
  const navigate = useNavigate()
  const animationProps = useSpring({
        transform: isOpen ? 'translateY(0%)' : 'translateY(100%)',
    });

    const handleSearch = async () => {
        setLoading(true);
        try {
          const config = {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTA2MDRkOWYzN2VmMWIyMjM3YTAxYyIsIm5hbWUiOiJSZXRzZXBpbGUgU2hhbyAiLCJlbWFpbCI6InJldHNlcGlsZS5yYXltb25kc2hhb0BnbWFpbC5jb20iLCJpYXQiOjE3MDI4Nzg2NDh9.QOoP7if8RGMLR7bW-sGR8XailJEiG-g7NTZwkFq0VFM`,
            },
          };
      
          const queries = [
            { field: 'description', value: searchable },
            { field: 'companyName', value: searchable },
            { field: 'deadline', value: searchable },
            { field: 'guidelines', value: searchable },
            { field: 'jobPosition', value: searchable },
            { field: 'location', value: searchable },
            { field: 'link', value: searchable },
          ];
      
          let response = null;
          for (const query of queries) {
            const { field, value } = query;
            if (value) {
              const apiQuery = `https://${URI_Server}/posts/search?${field}=${value}`;
              const apiResponse = await axios.get(apiQuery, config);
              if (apiResponse.data.length > 0) {
                response = apiResponse;
                break;
              }
            }
          }
      
          if (response && response.data.length > 0) {
            setSearchedPost(response.data);
          } else {
            setSearchedPost([]); // Empty list to indicate no results found
          }
      
          setLoading(false);
          console.log(response?.data);
        } catch (e) {
          console.log(e.message);
          setLoading(false);
        }
      };

      const handleNavigate = (post) => {
        // Convert the data object to a JSON string
        const dataString = JSON.stringify(post);
        localStorage.setItem("postDetails",dataString)
        navigate("/post")
      }
      
    
  return (
    <animated.div
      style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100%', // Set your desired height
        backgroundColor: 'white',
        ...animationProps,
        zIndex: 999
      }}
    >
      <Box sx={{p:2, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Close  onClick={onClose} />
        <h5>Search</h5>
        <MoreVert />
      </Box>
      <Divider />
      <Box>
        <form>
          <Box className="nu-searchBar" sx={{pl:2, pr:2}}>
                {!loading ? (<IconButton>
                    <SearchIcon  onClick={handleSearch}/>
                </IconButton>)
                :
                  (
                    <Box sx={
                      {mt: 1}
                    }>
                      <SmallerLoadSpinner />
                    </Box>
                  )
                }
                    <TextField
                        onChange={(e)=>setSearchable(e.target.value)}
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
          </Box>
        </form>
        <Box sx={{ p: 2 }}>
            {searchedPost?.length > 0 && searchedPost.map((post, index) => (
                <Card key={index} sx={{ p: 2, mb: 2 }} onClick={() => handleNavigate(post)}>
                    <h3>{post.companyName}</h3>
                    <p>{post.jobPosition}</p>
                    <p style={{ fontSize: "9px", color: "rgba(0, 0, 0, 0.479)" }}>{post.timeStemp}</p>
                </Card>
            ))}
        </Box>
      </Box>
    </animated.div>
  );
};

export default SearchBottomSheet;