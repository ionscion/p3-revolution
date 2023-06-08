import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginButton from "./login";
import LogoutButton from "./logout";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/style.css';

export default function ButtonAppBar() {
    const { isAuthenticated} = useAuth0();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }} style={{fontSize: "3.4em", paddingTop:'8px'}}>
            Legacy Architects
          </Typography>
          {!isAuthenticated && <LoginButton/>}
          {isAuthenticated && <LogoutButton/>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
