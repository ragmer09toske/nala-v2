import React, { useState } from 'react'
import GetUser from './GetUser'
import nonAuthRoutes from "nonAuthRoute";
import { Box } from '@mui/material';
import DefaultNavbar from 'components/Navbars/DefaultNavbar';
import Authenticate from './Auhtenticate';

const  SignInBasic = () => {
  const [toPassword, setToPassword] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <Box>
      <DefaultNavbar routes={nonAuthRoutes} dark />
      {!toPassword ?
        (<GetUser toPassword={setToPassword} setEmail={setEmail} email={email}/>)
        :
        (<Authenticate email={email}/>)
      }
    </Box>
  )
}

export default  SignInBasic