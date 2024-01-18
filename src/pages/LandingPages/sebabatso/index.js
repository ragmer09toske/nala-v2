import DefaultNavbar from 'components/Navbars/DefaultNavbar'
import { SearchBar } from 'components/SearchBar/SearchBar'
import React, { useEffect, useState } from 'react'
import routes from "nonAuthRoute";
import { Box, Card, Divider } from '@mui/material';
import axios from 'axios';
import SmallerLoadSpinner from 'assets/theme/components/LoadSpiner';
import MyChart from 'components/dataChats/pie';
import URI_Server from 'uri';

export const Sebabatso = () => {
    const [loading, setLoading] = useState(true); // Initialize loading state to true
    const [sabatsoYouth, setSabatsoYouth] = useState([]);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
                },
            };
            try {
                const response = await axios.get(
                    `https://${URI_Server}/nala/steam`,
                    config
                );
                setSabatsoYouth(response.data);
                setLoading(false);
            } catch (e) {
                console.log(e.message);
                setLoading(false);
            }
        };
        fetchCurrentUser();
    }, []); // The empty dependency array ensures the effect runs once after the initial render

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
                    {/* <MyChart /> */}
                    <Box>
                        <p></p>
                        <p></p>
                        <p></p>
                    </Box>
                    <SearchBar />
                    <Box>
                        {loading ? (
                            <Box sx={{display: "flex",justifyContent: "center"}}>
                                <SmallerLoadSpinner />
                            </Box>
                        ) : (
                            sabatsoYouth.map((item, key) => (
                               <>
                                <Card key={key} data={item} sx={{p: 2}}>
                                    <p style={{fontSize: "15px"}}>{item.name}</p>
                                    <p style={{fontSize: "9px", marginTop: -20 } }>{item?.discription}</p>
                                    <p style={{fontSize: "9px", marginTop: -20 } }>{item.district}</p>
                                    <Divider sx={{mt: -1}}/>
                                    <Box sx={{pt: 0.5}}>
                                        <p style={{fontSize: "9px", marginTop: -20 } }>{item.email}</p>
                                        <p style={{fontSize: "9px", marginTop: -20 } }>{item.numbers}</p>
                                        <p style={{fontSize: "9px", marginTop: -20 } }>{item?.numbersTwo}</p>
                                    </Box>
                                </Card>
                                <br/>
                               </>
                            ))
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
