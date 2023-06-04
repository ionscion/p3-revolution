import { createContext, useState, useEffect,  } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";
import { useQuery, useLazyQuery} from "@apollo/client";
import { GET_CLIENTNOAUTH, GET_CLIENTS } from "../utils/queries";


const ClientContext = createContext();

function Provider({ children }) {
  const [apiInfo, setApiInfo] = useState([]);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [user_id, setUser_id] = useState(""); // Declare user_id here
  


  // const { loading, data } = useQuery(GET_CLIENTNOAUTH);

  const [fetchClientsQuery, { loading: fetchLoading, data: fetchData }] = useLazyQuery(GET_CLIENTS, {
    variables: {
      user_id: user_id, // Pass the user_id obtained from the token
    },
    onCompleted: (data) => {
      if (data && data.getClients) {
        setApiInfo(data.getClients);
      }
    },
  });
  

  const getToken = async () => {
    const token = await getIdTokenClaims();
    setAccessToken(token.__raw); // get the actual token from the response
  };

  useEffect(() => {
    if (accessToken) {
      const user_id = jwt_decode(accessToken).sub.slice(6);
      setUser_id(user_id);
    }
  }, [accessToken]);
  
  useEffect(() => {
    if (user_id) {
      fetchClientsQuery({ variables: { userId: user_id } });
    }
  }, [user_id, fetchClientsQuery]);

  // useEffect(() => {
  //   if (user_id && pathname === "/clients") { // Replace "/your-route" with your actual route path
  //     fetchClientsQuery({ variables: { userId: user_id } });
  //   }
  // }, [user_id, fetchClientsQuery, pathname]);

//old works with no auth

  // const fetchClients = async () => {
  //   const user_id = jwt_decode(accessToken).sub.slice(6);

  //   console.log(user_id);
  //   console.log(data);
  //   console.log(data.getClientNoAuth);
  //   setApiInfo(data.getClientNoAuth);
  // };

  // const fetchClients = async () => {
  //   const user_id = jwt_decode(accessToken).sub.slice(6);
  //   console.log(user_id);
  //   fetch(`/api/v1/clients/${user_id}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   })
  //     .then((data) => data.json())
  //     .then((data) => setApiInfo(data))
  //     .catch((error) => console.error(error));
  // };

  // const getSingleClient = async (id) => {
  //   fetch(`/api/v1/clients/details/${id}`, {
  //     method: "GET",
  //     headers: {
  //       "Cache-Control": "no-cache",
  //       Pragma: "no-cache",
  //       Expires: "0",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   })
  //     .then((data) => data.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error(error));
  // };

  // const getClient = async (id) => {
  //   try {
  //     if (!apiInfo) {
  //       await fetchClients();
  //     }
  //     const client = apiInfo.find((client) => client.id === id);
  //     return client;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const createClientAuth = async (data) => {
  //   const user_id = jwt_decode(accessToken).sub.slice(6);
  //   data.user_id = user_id; // Add user_id to the data object
  //   fetch(`/api/v1/clients/auth`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Bearer " + accessToken,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setApiInfo(data))
  //     .catch((error) => console.error(error));
  // };

  // const createClient = async (data) => {
  //   fetch(`/api/v1/clients/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setApiInfo(data))
  //     .catch((error) => console.error(error));
  // };

  const valueToShare = {
    // fetchClients,
    getToken,
    apiInfo,
    user_id,
    // accessToken,
    // createClient,
    // createClientAuth,
    // getSingleClient,
    // getClient,
    // clientData,
  };

  return (
    <ClientContext.Provider value={valueToShare}>
      {children}
    </ClientContext.Provider>
  );
}

export { Provider };
export default ClientContext;
