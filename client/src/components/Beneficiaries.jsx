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
import {
  CREATE_BENEFICIARY,
  UPDATE_BENEFICIARY,
  DELETE_BENEFICIARY,
} from "../utils/mutations";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const [values, setValues] = useState([
    {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      relationship: "",
      percentage: "",
      id: "",
    },
  ]);

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

  const [updateBeneficiary] = useMutation(UPDATE_BENEFICIARY);

  const [deleteBeneficiary] = useMutation(DELETE_BENEFICIARY);

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
      const mappedValues = data.getBeneficiariesById.map((beneficiary) => ({
        firstName: beneficiary.first_name || "",
        middleName: beneficiary.middle_name || "",
        lastName: beneficiary.last_name || "",
        email: beneficiary.email || "",
        phone: beneficiary.phone_number || "",
        dob: beneficiary.birthday || "",
        relationship: beneficiary.relationship || "",
        percentage: beneficiary.percentage || "",
        id: beneficiary._id || "",
      }));
      setValues(mappedValues);
    } else {
      // Reset the form values when no beneficiaries are present
      setValues([]);
    }
  }, [data]);

  const handleChange = useCallback((event, beneficiaryIndex) => {
    const { name, value } = event.target;
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[beneficiaryIndex] = {
        ...updatedValues[beneficiaryIndex],
        [name]: value,
      };
      return updatedValues;
    });
  }, []);

  const handleInputChange = (event) => {
    setNewBene({ ...newBene, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (index) => {
    // Access the beneficiary using the index
    const beneficiary = values[index];
    try {
      const response = await updateBeneficiary({
        variables: {
          beneficiaryId: beneficiary.id,
          input: {
            first_name: beneficiary.firstName,
            middle_name: beneficiary.middleName,
            last_name: beneficiary.lastName,
            email: beneficiary.email,
            phone_number: beneficiary.phone,
            relationship: beneficiary.relationship,
            percentage: parseInt(beneficiary.percentage),
            birthday: beneficiary.dob,
          },
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    // Perform the desired actions with the beneficiary data
    console.log("Saving beneficiary:", beneficiary);
  };

  const handleAddBeneficiary = (event) => {
    event.preventDefault();
    createBeneficiary();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (index) => {
    const beneficiary = values[index];
    try {
      const response = await deleteBeneficiary({
        variables: {
          beneficiaryId: beneficiary.id,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader
        subheader="This information can be edited"
        action={
          <Button
            style={{ backgroundColor: "#0B746C", color: "white" }}
            variant="contained"
            onClick={handleOpenModal}
          >
            Add Beneficiary
          </Button>
        }
      />
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
                label="E-Mail"
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
              <Button
                style={{ backgroundColor: "#0B746C", color: "white" }}
                type="submit"
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <CardContent sx={{ pt: 0 }}>
        {data &&
        data.getBeneficiariesById &&
        data.getBeneficiariesById.length > 0 ? (
          values.map((beneficiary, index) => (
            <Box key={beneficiary.id} sx={{ mb: 2 }}>
              <Card>
                <CardHeader subheader="Beneficiary Information" />
                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ m: -1.5 }}>
                    <Grid container spacing={3}>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          helperText="Please specify the first name"
                          label="First Name"
                          name="firstName"
                          onChange={(event) => handleChange(event, index)}
                          required
                          value={beneficiary.firstName || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Middle Name"
                          name="middleName"
                          onChange={(event) => handleChange(event, index)}
                          required
                          value={beneficiary.middleName || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          onChange={(event) => handleChange(event, index)}
                          required
                          value={beneficiary.lastName || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="E-Mail"
                          name="email"
                          onChange={(event) => handleChange(event, index)}
                          required
                          value={beneficiary.email || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          onChange={(event) => handleChange(event, index)}
                          type="number"
                          value={beneficiary.phone || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Date of Birth"
                          name="dob"
                          onChange={(event) => handleChange(event, index)}
                          required
                          value={beneficiary.dob || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Relationship"
                          name="relationship"
                          onChange={(event) => handleChange(event, index)}
                          required
                          value={beneficiary.relationship || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Percentage"
                          name="percentage"
                          onChange={(event) => handleChange(event, index)}
                          required
                          value={beneficiary.percentage || ""}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <Divider />

                <CardActions
                  disableSpacing
                  sx={{ justifyContent: "space-between" }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleSubmit(index)}
                  >
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
