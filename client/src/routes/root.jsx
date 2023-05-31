import { useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ClientContext from "../context/clients";
import Dashboard from "../components/Dashboard";
import ButtonAppBar from "../components/Appbar";
import { Outlet} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#0B746C",
    },
    secondary: {
      main: "#0B746C",
    },
  },
});

function Root() {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const { getToken, apiInfo, accessToken } =
    useContext(ClientContext);

  useEffect(() => {
    if (isAuthenticated) {
      getToken();
    }
  }, [getIdTokenClaims, isAuthenticated]);

  useEffect(() => {
    if (accessToken) {
      // fetchClients();
    }
  }, [accessToken]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ButtonAppBar />
        {isAuthenticated && <Dashboard />}
        {isAuthenticated && <Outlet context={apiInfo} />}
      </ThemeProvider>
    </>
  );
}

export default Root;
