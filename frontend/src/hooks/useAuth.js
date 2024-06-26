import { useContext } from "react";
import AuthContext from "../provider/authProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;