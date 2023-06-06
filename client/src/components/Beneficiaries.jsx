import { useCallback, useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_CLIENT } from "../utils/queries";
import { UPDATE_CLIENT } from "../utils/mutations";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

export default function Beneficiaries() {
  
  const [values, setValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    relationship: "",
    percentage: "",
  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
  };

return (
<Card>
<CardHeader subheader="This information can be edited" />
<CardContent sx={{ pt: 0 }}>
  <Box sx={{ m: -1.5 }}>
    <Grid container spacing={3}>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          helperText="Please specify the first name"
          label="First name"
          name="firstName"
          onChange={handleChange}
          required
          value={values.firstName || ""}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Middle Name"
          name="middleName"
          onChange={handleChange}
          required
          value={values.middleName || ""}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          onChange={handleChange}
          required
          value={values.lastName || ""}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          onChange={handleChange}
          required
          value={values.email || ""}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          onChange={handleChange}
          type="number"
          value={values.phone || ""}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Date of Birth"
          name="dob"
          onChange={handleChange}
          required
          value={values.dob || ""}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Relatives"
          name="relationship"
          onChange={handleChange}
          required
          value={values.relationship || ""}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Percentage"
          name="percentage"
          onChange={handleChange}
          required
          value={values.percentage || ""}
        />
    </Grid>
    </Grid>
  </Box>
</CardContent>
<Divider />
<CardActions sx={{ justifyContent: "flex-end" }}>
  <Button variant="contained" onClick={handleSubmit}>
    Save details
  </Button>
</CardActions>
</Card>
);
};