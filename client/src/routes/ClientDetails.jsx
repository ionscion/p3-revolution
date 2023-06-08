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
import Beneficiaries from "../components/Beneficiaries";
import Financials from "../components/Financials";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ClientProfileDetails = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const { id } = useLoaderData();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    citizenship: "",
    marital: "",
    street: "",
    city: "",
    state: "",
    postcode: "",
  });

  const [updateClientMutation, { err }] = useMutation(UPDATE_CLIENT);

  const [fetchClient, { loading, error, data }] = useLazyQuery(GET_CLIENT, {
    variables: { id: id },
    onError: (error) => {
      console.error("Error fetching client data", error);
    },
  });

  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  useEffect(() => {
    if (data && data.getClientById) {
      const client = data.getClientById;
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
        street: client.street ? client.street : "",
        city: client.city ? client.city : "",
        state: client.state ? client.state : "",
        postcode: parseInt(client.postcode) ? parseInt(client.postcode) : "",
      }));
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
    console.log(values);
    try {
      const response = await updateClientMutation({
        variables: {
          clientId: id,
          input: {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            phone_number: values.phone,
            birthday: values.dob,
            street: values.street,
            city: values.city,
            state: values.state,
            postcode: parseInt(values.postcode),
          },
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="General Information" {...a11yProps(0)} />
          <Tab label="Beneficiaries" {...a11yProps(1)} />
          <Tab label="Financial" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Card>
          <CardHeader
            subheader="This information can be edited."
            style={{ marginBottom: "20px" }}
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    onChange={handleChange}
                    required
                    value={values.firstName || ""}
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
                    label="E-Mail Address"
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
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="street"
                    onChange={handleChange}
                    required
                    value={values.street || ""}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    onChange={handleChange}
                    required
                    value={values.city || ""}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    onChange={handleChange}
                    required
                    value={values.state || ""}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    name="postcode"
                    onChange={handleChange}
                    required
                    value={values.postcode || ""}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{
                marginTop: "15px",
                backgroundColor: "#0B746C",
                color: "white",
              }}
            >
              Save details
            </Button>
          </CardActions>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Beneficiaries />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Financials />
      </TabPanel>
    </Box>
  );
};
