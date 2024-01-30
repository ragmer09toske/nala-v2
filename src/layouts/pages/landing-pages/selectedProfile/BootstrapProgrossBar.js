import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box } from '@mui/material';

const BootstrapProgrossBar = ({completionPercentage}) => {
  return (
    <Box sx={{p: 2,pt: 3, display:"flex",flexDirection:"column",justifyContent:"center" ,gap: 1}}>
        <Box>
            <ProgressBar now={completionPercentage} label={`${completionPercentage}%`} />
        </Box>
        <Box>
            <h5 className='ubuntu'>Finish up setting your profile</h5>
        </Box>
    </Box>
  );
};

export default BootstrapProgrossBar;
