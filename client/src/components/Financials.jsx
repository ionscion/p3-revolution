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
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_FINANCIALS } from "../utils/queries";
import DeleteIcon from "@mui/icons-material/Delete";
import useModal from "../hooks/useModal";

export default function Financials() {
  const { id } = useLoaderData();
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();

  const [getFinancials, { data }] = useLazyQuery(GET_FINANCIALS, {
    variables: { clientId: id },
  });

  const [newFinancial, setNewFinancial] = useState([
    {
      accountName: "",
      accountNumber: "",
      accountType: "",
      accountBalance: "",
      bankName: "",
      user_id: id,
    },
  ]);

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

  useEffect(() => {
    if (id) {
      getFinancials();
    }
  }, [id]);

  useEffect(() => {
    if (data && data.getFinancials && data.getFinancials.length > 0) {
      const mappedData = data.getFinancials.map((financial) => ({
        accountName: financial.account_name,
        accountNumber: financial.account_number,
        accountType: financial.account_type,
        accountBalance: financial.account_balance,
        bankName: financial.bank_name,
        id: financial._id,
      }));
      setValues(mappedData);
    } else {
      setValues([]);
    }
  }, [data]);

  const handleChange = useCallback((event, financialIndex) => {
    const { name, value } = event.target;
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[financialIndex] = {
        ...updatedValues[financialIndex],
        [name]: value,
      };
      return updatedValues;
    });
  }, []);

  const handleInputChange = (event) => {
    setNewFinancial({
      ...newFinancial,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddFinancials = (event) => {
    event.preventDefault();
    console.log(newFinancial);
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
            New Financial Account
          </Typography>
          <form onSubmit={handleAddFinancials}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                required
                label="Account Name"
                variant="outlined"
                margin="normal"
                name="account_name"
                value={newFinancial.account_name}
                onChange={handleInputChange}
              />
              <TextField
                required
                label="Account Number"
                variant="outlined"
                margin="normal"
                name="account_number"
                value={newFinancial.account_number}
                onChange={handleInputChange}
              />
              <TextField
                required
                label="Account Type"
                variant="outlined"
                margin="normal"
                name="account_type"
                value={newFinancial.account_type}
                onChange={handleInputChange}
              />
              <TextField
                label="Bank Name"
                variant="outlined"
                margin="normal"
                name="bank_name"
                value={newFinancial.bank_name}
                onChange={handleInputChange}
              />
              <TextField
                required
                label="Account Balance"
                variant="outlined"
                margin="normal"
                name="account_balance"
                value={newFinancial.account_balance}
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
                    style={{
                      backgroundColor: "#0B746C",
                      color: "white",
                      marginTop: "15px",
                    }}
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
