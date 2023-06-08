import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from '@mui/material';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button style={{backgroundColor: '#07C481', borderRadius: '25px', color: 'white', fontSize:'12px', fontWeight:'bold', paddingTop:'8px'}} variant="contained" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;