import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Modal } from "@mui/material";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useClientContext from "../hooks/useClientContext";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_CLIENT } from "../utils/mutations";
import IconButton from "./IconButton"



export default function Dashboard() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createClient, getToken, createClientAuth, user_id } = useClientContext();
  const [client, setClient] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    user_id: user_id,
  });
  const open = Boolean(anchorEl);

  const [createClientMutation, {error}] = useMutation(CREATE_CLIENT);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    // createClient(client);
   
    try {
      createClientMutation({
        variables: {
          firstName: client.first_name,
          lastName: client.last_name,
          email: client.email,
          phoneNumber: client.phone_number,
          user_id: user_id,
        },
      });
    }
    catch (error) {
      console.error(error);
    }

    handleCloseModal();
  };

  const handleRefresh = () => {
    window.location.reload();
  }

  return (
    <div style={{ margin: 10 }}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        size="large"
        style={{ marginTop: "5px", borderRadius: "5px", backgroundColor: "#0B746C", color: "white", fontSize:'13px', fontWeight:'bold', paddingTop:'9px'}}
      >
        Dashboard
      </Button>
     
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to="/clients"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            All Contacts
          </Link>
        </MenuItem>
        <MenuItem onClick={handleOpenModal}>New Contact</MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
        </MenuItem>
      </Menu>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            New Contact
          </Typography>
          <form onSubmit={handleSubmitForm}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                required
                label="First Name"
                variant="outlined"
                margin="normal"
                name="first_name"
                value={client.first_name}
                onChange={handleInputChange}
              />
              <TextField
                required
                label="Last Name"
                variant="outlined"
                margin="normal"
                name="last_name"
                value={client.last_name}
                onChange={handleInputChange}
              />
              <TextField
                required
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                name="email"
                value={client.email}
                onChange={handleInputChange}
              />
              <TextField
                required
                label="Phone Number"
                type="input"
                variant="outlined"
                margin="normal"
                name="phone_number"
                value={client.phone_number}
                onChange={handleInputChange}
              />
              <Button style={{marginTop:"15px", backgroundColor: "#0B746C", color: "white"}} type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <IconButton onClick={handleRefresh}/>
    </div>
  );
}
