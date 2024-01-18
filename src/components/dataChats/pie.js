import { Box } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import URI_Server from 'uri';




const MyChart = () => {
  const [userData, setUserData] = useState()

  const dataQuery = async () => {
    try{
      const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
    };
      const response = await axios.get(`https://${URI_Server}/nala/steam`, config )
      console.log(response.data)
    }
    catch(e){
      console.log(e.message)
    }
  }
  dataQuery()

  const data = [
    { name: 'Sci', Male: 18, Female: 23, amt: 2400 },
    { name: 'Tech', Male: 34, Female: 32, amt: 2210 },
    { name: 'Engi', Male: 25, Female: 7, amt: 2290 },
    { name: 'Arts', Male: 15, Female: 12, amt: 2000 },
    { name: 'Math', Male: 18, Female: 15, amt: 2181 },
    { name: 'Entre',Male: 23, Female: 13, amt: 2500 },
  ];
  
  return (
    <Box sx={{
        maxWidth: "10vw",
        overFlow: "scroll"
    }}>
        <LineChart width={350} height={400} data={data} >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="Male" stroke="#8884d8" />
        <Line type="monotone" dataKey="Female" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        </LineChart>
    </Box>
  );
};

export default MyChart;
