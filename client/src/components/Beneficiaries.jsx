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
  Typography
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_BENEFICIARIES } from "../utils/queries";

export default function Beneficiaries() {
  const { id } = useLoaderData();
  const [fetchBeneficiariesQuery, { loading, error, data }] = useLazyQuery(
    GET_BENEFICIARIES,
    {
      variables: { clientId: id },
    }
  );

  useEffect(() => {
    if (id) {
      fetchBeneficiariesQuery();
    }
  }, [id]);

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

  useEffect(() => {
    if (
      data &&
      data.getBeneficiariesById &&
      data.getBeneficiariesById.length > 0
    ) {
      const beneficiary = data.getBeneficiariesById[0]; // Access the first beneficiary in the array
      setValues((prevState) => ({
        ...prevState,
        firstName: beneficiary.first_name ? beneficiary.first_name : "",
        middleName: beneficiary.middle_name ? beneficiary.middle_name : "",
        lastName: beneficiary.last_name ? beneficiary.last_name : "",
        email: beneficiary.email ? beneficiary.email : "",
        phone: beneficiary.phone_number ? beneficiary.phone_number : "",
        dob: beneficiary.birthday ? beneficiary.birthday : "",
        relationship: beneficiary.relationship ? beneficiary.relationship : "",
        percentage: beneficiary.percentage ? beneficiary.percentage : "",
      }));
    } else {
      // Reset the form values when no beneficiaries are present
      setValues({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        relationship: "",
        percentage: "",
      });
    }
  }, [data]);

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
        {data && data.getBeneficiariesById && data.getBeneficiariesById.length > 0 ? (
          data.getBeneficiariesById.map((beneficiary) => (
            <Box key={beneficiary._id} sx={{ mb: 2 }}>
              <Card>
                <CardHeader subheader="Beneficiary Information" />
                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ m: -1.5 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          helperText="Please specify the first name"
                          label="First name"
                          name="firstName"
                          onChange={handleChange}
                          required
                          value={beneficiary.first_name || ""}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Middle Name"
                          name="middleName"
                          onChange={handleChange}
                          required
                          value={beneficiary.middle_name || ""}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          onChange={handleChange}
                          required
                          value={beneficiary.last_name || ""}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          onChange={handleChange}
                          required
                          value={beneficiary.email || ""}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          onChange={handleChange}
                          type="number"
                          value={beneficiary.phone_number || ""}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Date of Birth"
                          name="dob"
                          onChange={handleChange}
                          required
                          value={beneficiary.birthday || ""}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Relatives"
                          name="relationship"
                          onChange={handleChange}
                          required
                          value={beneficiary.relationship || ""}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Percentage"
                          name="percentage"
                          onChange={handleChange}
                          required
                          value={beneficiary.percentage || ""}
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
            </Box>
          ))
        ) : (
          <Typography variant="body1">No beneficiaries found.</Typography>
        )}
      </CardContent>
    </Card>
  );
  

}