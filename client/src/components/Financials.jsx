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
import { GET_FINANCIALS } from "../utils/queries";

export default function Financials() {
  const { id } = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [getFinancials, { data }] = useLazyQuery(GET_FINANCIALS, {
    variables: { clientId: id },
    });

  const [values, setValues] = useState([
    {
      accountName: "",
      accountNumber: "",
      accountType: "",
      accountBalance: "",
      bankName: "",
      id: "",
    },
  ]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Card>
      <CardHeader
        subheader="This information can be edited."
        action={
          <Button
            style={{ backgroundColor: "#0B746C", color: "white" }}
            variant="contained"
            onClick={handleOpenModal}
          >
            Add Financials
          </Button>
        }
      />
      {/* <Modal open={isModalOpen} onClose={handleCloseModal}>
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
            New Financial Account
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
      </Modal> */}
      <CardContent sx={{ pt: 0 }}>
        {data && data.getFinancials && data.getFinancials.length > 0 ? (
          values.map((financial, index) => (
            <Box key={financial.id} sx={{ mb: 2 }}>
              <Card>
                <CardHeader subheader="Account Information" />
                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ m: -1.5 }}>
                    <Grid container spacing={3}>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Account Name"
                          name="accountName"
                          onChange={(event) => handleChange(event, index)}
                          required
                          value={financial.accountName || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Account Number"
                          name="accountNumber"
                          onChange={(event) => handleChange(event, index)}
                          required
                          value={financial.accountNumber || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Account Type"
                          name="accountType"
                          onChange={(event) => handleChange(event, index)}
                          required
                          value={financial.accountType || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Account Balance"
                          name="accountBalance"
                          onChange={(event) => handleChange(event, index)}
                          required
                          value={financial.accountBalance || ""}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Bank Name"
                          name="bankName"
                          onChange={(event) => handleChange(event, index)}
                          required
                          value={financial.bankName || ""}
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
                  style={{ backgroundColor: "#0B746C", color: "white", marginTop:'15px'}}
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
          <Typography variant="body1">No financials found.</Typography>
        )}
      </CardContent>
    </Card>
  );
}
