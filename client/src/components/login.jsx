import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from '@mui/material';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button style={{backgroundColor: '#07C481', borderRadius: '25px', color: 'white'}} variant="contained" onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;