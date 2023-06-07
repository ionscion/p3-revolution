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
  Typography,
  Modal,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_BENEFICIARIES } from "../utils/queries";
import { CREATE_BENEFICIARY } from "../utils/mutations";

export default function Beneficiaries() {
  const { id } = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchBeneficiariesQuery, { loading, error, data }] = useLazyQuery(
    GET_BENEFICIARIES,
    {
      variables: { clientId: id },
    }
  );
  const [newBene, setNewBene] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    relationship: "",
    percentage: "",
    user_id: id,
  });

  const [createBeneficiary] = useMutation(CREATE_BENEFICIARY, {
    variables: {
      firstName: newBene.first_name,
      lastName: newBene.last_name,
      email: newBene.email,
      phoneNumber: newBene.phone_number,
      relationship: newBene.relationship,
      percentage: parseInt(newBene.percentage),
      clientId: id,
    },
  });



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
    if (id) {
      fetchBeneficiariesQuery();
    }
  }, [id]);

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

  const handleInputChange = (event) => {
    setNewBene({ ...newBene, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const handleAddBeneficiary = (event) => {
    event.preventDefault();
    console.log("Add beneficiary");
    createBeneficiary();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Card>
      <CardHeader
        subheader="This information can be edited"
        action={
          <Button variant="contained" onClick={handleOpenModal}>
            Add Beneficiary
          </Button>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        {data &&
        data.getBeneficiariesById &&
        data.getBeneficiariesById.length > 0 ? (
          data.getBeneficiariesById.map((beneficiary) => (
            <Box key={beneficiary._id} sx={{ mb: 2 }}>
              <Card>
                <CardHeader subheader="Beneficiary Information" />
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
                          value={beneficiary.first_name || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Middle Name"
                          name="middleName"
                          onChange={handleChange}
                          required
                          value={beneficiary.middle_name || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          onChange={handleChange}
                          required
                          value={beneficiary.last_name || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          onChange={handleChange}
                          required
                          value={beneficiary.email || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          onChange={handleChange}
                          type="number"
                          value={beneficiary.phone_number || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Date of Birth"
                          name="dob"
                          onChange={handleChange}
                          required
                          value={beneficiary.birthday || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Relationship"
                          name="relationship"
                          onChange={handleChange}
                          required
                          value={beneficiary.relationship || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
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
                    New Beneficiary
                  </Typography>
                  <form onSubmit={handleAddBeneficiary}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TextField
                        required
                        label="First Name"
                        variant="outlined"
                        margin="normal"
                        name="first_name"
                        value={newBene.first_name}
                        onChange={handleInputChange}
                      />
                      <TextField
                        required
                        label="Last Name"
                        variant="outlined"
                        margin="normal"
                        name="last_name"
                        value={newBene.last_name}
                        onChange={handleInputChange}
                      />
                      <TextField
                        required
                        label="Email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        name="email"
                        value={newBene.email}
                        onChange={handleInputChange}
                      />
                      <TextField
                        required
                        label="Phone Number"
                        type="input"
                        variant="outlined"
                        margin="normal"
                        name="phone_number"
                        value={newBene.phone_number}
                        onChange={handleInputChange}
                      />
                      <TextField
                        required
                        label="Relationship"
                        type="input"
                        variant="outlined"
                        margin="normal"
                        name="relationship"
                        value={newBene.relationship}
                        onChange={handleInputChange}
                      />
                      <TextField
                        required
                        label="Percentage"
                        type="input"
                        variant="outlined"
                        margin="normal"
                        name="percentage"
                        value={newBene.percentage}
                        onChange={handleInputChange}
                      />
                      <Button type="submit" variant="contained">
                        Save
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Modal>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No beneficiaries found.</Typography>
        )}
      </CardContent>
    </Card>
  );
}
