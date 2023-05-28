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
import { useLoaderData } from "react-router-dom"


export const ClientProfileDetails = () => {
  const {id} = useLoaderData();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    citizenship: "",
    marital: "",
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/v1/clients/details/${id}`, {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
  
        if (response.ok) {
          const client = await response.json();
          console.log(client.first_name);
          setValues((prevState) => ({
            ...prevState,
            firstName: client.first_name,
            lastName: client.last_name,
            email: client.email,
            phone: client.phone_number,
            dob: client.birthday,
            gender: client.gender ? client.gender : "",
            citizenship: client.citizenship ? client.citizenship : "",
            marital: client.marital_status ? client.marital_status : "",
          }));
        } else {
          console.error("Error fetching client data");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="General" />
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
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName || ""}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
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
                  label="Gender"
                  name="gender"
                  onChange={handleChange}
                  required
                  value={values.gender || ""}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Citizenship"
                  name="citizenship"
                  onChange={handleChange}
                  required
                  value={values.citizenship || ""}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Marital Status"
                  name="marital"
                  onChange={handleChange}
                  required
                  value={values.marital || ""}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
};
