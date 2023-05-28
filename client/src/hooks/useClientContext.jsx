import { useContext } from "react";
import ClientContext from "../context/clients";

//custom hook
function useClientContext() {
    return useContext(ClientContext);
}

export default useClientContext;